import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import listingStyles from "../styles/ListingsPage.module.css";
import { Row, Col, } from "antd";
import { Header } from "antd/lib/layout/layout";
import atsStyle from "../styles/ATS.module.css";

export default function Home() {
  return (
    <div className={styles.container} {...listingStyles}>
      <Head>
        <title>Home | RickedStudios</title>
        <link
          rel="icon"
          href="https://static.wixstatic.com/media/a2f067_10219a31bb08479399922a59eca3dc6c~mv2.png/v1/crop/x_214,y_155,w_197,h_89/fill/w_162,h_74,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/final.png"
        />
      </Head>

      <main className={styles.main}>
        <Header className={styles.header}>
          <Row>
            <Col flex="auto">
              <img
                src="/logo_transparent.webp"
                alt="Logo"
                className={atsStyle.logo}
              />
            </Col>
            <Col flex="80px">
              <Link href="/jobs">
                <span className={listingStyles.button}> Jobs </span>

              </Link>
            </Col>
            <Col flex="80px">
              <Link href="/login">
                <span className={listingStyles.button}> Sign In </span>
              </Link>
            </Col>
          </Row>

        </Header>

        <Row
          style={{
            minHeight: "40vh",
          }}
          className={listingStyles.primary_b}
          justify="center"
          align="bottom"
        >
          <Col
            xs={{ span: 20 }}
            lg={{ span: 8 }}
            style={{ paddingBottom: "5rem" }}
          >
            <h1 className={listingStyles.secondary}>RickedStudios</h1>
            <h5 className={listingStyles.secondary}>We Help Build h5 Careers</h5>
            <Link href="/jobs">
              <span className={listingStyles.button}>View Open Jobs</span>
            </Link>
          </Col>
          <Col
            xs={{ span: 20 }}
            lg={{ span: 8 }}
            style={{ paddingBottom: "5rem" }}
          >
            <p className={listingStyles.secondary}>
              Caring for your Job Today and Tomorrow We believe in providing
              strategic solutions that are effective and brings value which are
              simple to adopt, economical and also competitive.
            </p>
            <p
              className={[
                listingStyles.secondary,
                listingStyles.margin_bottom,
              ].join(" ")}
            >
              We are successful in closing the positions on time by providing
              prime talent to our esteemed clients. by helping our client
              organizations
            </p>
          </Col>
        </Row>
        <Row style={{ minHeight: "30vh", paddingTop: "5%" }} justify="center">
          <Col xs={{ span: 20 }} lg={{ span: 8 }}>
            <h2>About Us</h2>
          </Col>
          <Col xs={{ span: 20 }} lg={{ span: 8 }}>
            <p className={[listingStyles.secondary].join(" ")}>
              PlatOz HR was established in 2007 for bringing about a
              transformation in the way an enterprise looks at different
              concepts and values their most important resource which is Human
              Capital. At the same time, the team at PlatOz wanted to support
              people in the way they look at their own careers and was concerned
              in working in areas that would empower people to take charge of
              their own careers.
            </p>
          </Col>
        </Row>
        <Row style={{ paddingTop: "5rem" }} justify="center" align="bottom">
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            xs={{ span: 20 }}
            lg={{ span: 16 }}
          >
            <h2>Our Team</h2>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
            </Col>
          </Col>
        </Row>
      </main>
    </div>
  );
}