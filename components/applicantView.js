import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import useSWR, { mutate } from "swr";
import { List, Spin, Card, Tag, Row, Col, Rate } from "antd";
import ViewApplicantModal from "./viewApplicantModal";

export default function ApplicantView(props) {
  const { data, error } = useSWR(`/api/jobs/${props.data}`, async function (
    args
  ) {
    try {
      const res = await fetch(args);
      const jsonData = await res.json();
      return jsonData;
    } catch (err) {
      console.error("Error fetching or parsing JSON:", err);
      return;
    }
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [applicantData, setApplicantData] = useState({});
  
  // Function to update the stage for an applicant
  const updateApplicantStage = async (applicantId, newStage) => {
    try {
      await fetch(`/api/applicants/${applicantId}`, {
        method: "put",
        body: JSON.stringify({ stage: newStage }),
      });
      // Refresh the data
      mutate(`/api/jobs/${props.data}`);
    } catch (error) {
      console.error("Error updating stage:", error);
    }
  };

  function setColor(stage) {
    let color;
    switch (stage) {
      case "Applied":
        color = "magenta";
        break;
      case "Interview":
        color = "gold";
        break;
      case "Offer":
        color = "green";
        break;
      default:
        color = "blue";
        break;
    }
    return color;
  }

  if (error) {
    console.log(error);
    return "(error: " + error.message + ")";
  }
  if (!data)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  return (
    <div>
      <ViewApplicantModal
        visible={modalVisible}
        data={applicantData}
        close={() => {
          mutate(`/api/jobs/${props.data}`);
          setModalVisible(false);
        }}
        pipeline={props.pipeline}
        updateApplicantStage={updateApplicantStage} // Pass the function to the modal
      />
      <List
        split={false}
        itemLayout="horizontal"
        pagination={{ position: "bottom", align: "end" }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: "100%" }}
              bodyStyle={{ padding: "1rem" }}
              onClick={() => {
                setApplicantData(item);
                setModalVisible(true);
              }}
            >
              <Row>
                <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                  {item.name}
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                  <Tag color={setColor(item.stage)}>{item.stage}</Tag>
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                  <Rate value={item.rating} disabled />
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {item.introduction}
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
