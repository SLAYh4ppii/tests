import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import listingStyles from "../../styles/ListingsPage.module.css";
import { Row, Col, Divider, List } from "antd";

function Jobs({ jobs }) {
  return (
    <div className={styles.container} {...listingStyles}>
      <Head>
        <title>Work with us | RickedStudios</title>
        <link rel="icon" href="/favicon.webp" />
      </Head>

      <main className={styles.main}>
        <Row style={{ paddingTop: "4rem" }} justify="center" align="top">
          <Col xs={{ span: 20 }} lg={{ span: 10 }}>
            <h1>Job Openings</h1>
            <Divider />
            {jobs.length ? (
              <List
                className={listingStyles.list}
                dataSource={jobs}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Link key={item._id} href={`/jobs/${item._id}`}>
                        <span className={listingStyles.link} key="apply">
                          Apply
                        </span>
                      </Link>,
                    ]}
                  >
                    <List.Item.Meta title={item.title} description={item.location} /></List.Item>//workaround look for header h5 fix, fixed it by romoving h5
                )}
              />
            ) : (
              "No Jobs ..."
            )}
          </Col>
        </Row>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.URL}api/jobs`);
    const jobs = await res.json();

    return {
      props: {
        jobs,
      },
      revalidate: 1, // Adjust this value as needed
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        jobs: [],
      },
      revalidate: 1, // Adjust this value as needed
    };
  }
}

export default Jobs;
