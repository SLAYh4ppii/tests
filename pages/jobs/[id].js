import Head from "next/head";
import styles from "../../styles/Home.module.css";
import listingStyles from "../../styles/ListingsPage.module.css";
import { Row, Col, Form, Input, Button, Divider, message, Upload } from "antd";
import fetch from "isomorphic-unfetch";
import dynamic from "next/dynamic";
// import ReactMarkdown from "react-markdown";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false
});


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a valid email!",
    number: "Not a valid number!",
    url: "Not a valid url!",
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function Jobs({ data, id }) {
  const [form] = Form.useForm();

  async function handleSubmit(e) {
    e.listing = id;
    const eString = JSON.stringify(e, (k, v) => (v === undefined ? null : v));
    await fetch("/api/applicants", {
      method: "post",
      body: eString,
    });
    form.resetFields();
    message.success("Your application has been submitted");
  }

  return (
    <div className={styles.container} {...listingStyles}>
      <Head>
        <title>Jobs</title>
        <link rel="icon" href="/favicon.webp" />
      </Head>

      {data ? (
        <main className={styles.main}>
          <Row style={{ paddingTop: "4rem" }} justify="center" align="top">
            <Col xs={{ span: 20 }} lg={{ span: 10 }}>
              <h1>{data.title}</h1>
              <h3>{data.location}</h3>
              {/* <ReactMarkdown source={data.description} /> */}

              <Divider style={{ margin: "2rem 0" }} />

              <ReactQuill theme="bubble" readOnly={true} value={data.description}/>
              <Divider style={{ margin: "2rem 0" }} />
              <h3>Apply For This Job</h3>
              <Form
                form={form}
                {...layout}
                name="insert-applicant"
                onFinish={handleSubmit}
                validateMessages={validateMessages}
                style={{ maxWidth: "600px" }}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }, { type: "email" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="cv"
                  label="CV"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true }]}
                >
                  <Upload name="file" action="/api/cv" accept=".pdf">
                    <Button>Upload CV</Button>
                  </Upload>
                </Form.Item>
                <Form.Item name="phone" label="Phone Number">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="linkedin"
                  label="LinkedIn"
                  rules={[{ type: "url" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="website"
                  label="Website"
                  rules={[{ type: "url" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="introduction"
                  label="Short Introduction"
                  rules={[
                    {
                      max: 300,
                      message:
                        "Your introduction cannot be longer than 300 characters!",
                    },
                    { type: "string" },
                  ]}
                >
                  <Input.TextArea rows={8} />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 6,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit Application
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </main>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const id = params.id && params.id != 'undefined' ? params.id : null;

  if (id) {
    const res = await fetch(`${process.env.URL}api/jobListing/${id}`);
    const data = await res.json();
    console.log(data);
    return {
      props: {
        data,
        id,
      },
      revalidate: 60,
    };
  } else {
    throw Error("Job Id is needed"); //test
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default Jobs;
