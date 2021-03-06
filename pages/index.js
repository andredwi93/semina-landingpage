import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Brand from "../components/Brand";
import CardEvent from "../components/CardEvent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Statistic from "../components/Statistic";
import Stories from "../components/Stories";
import { getData } from "../utils/fetchData";

export default function Home() {
  const [data, setData] = useState([])

  const getDataLandingPage = useCallback(async () => {
    const req = await getData("api/v1/participants/landing-page");
    setData(req.data)
  }, []);

  useEffect(() => {
    getDataLandingPage();
  }, []);

  return (
    <>
      <Head>
        <title>Semina | Landing Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Brand />
      <CardEvent data={data} title="Featured Events" subTitle="Grow Today" />
      <Stories />
      <Statistic />
      <Footer />
    </>
  );
}