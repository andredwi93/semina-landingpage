import Cookies from "js-cookie";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Brand from "../../components/Brand";
import Button from "../../components/Button";
import CardEvent from "../../components/CardEvent";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Statistic from "../../components/Statistic";
import Stories from "../../components/Stories";
import { getData } from "../../utils/fetchData";
import { formatDate } from "../../utils/formatDate";

export default function DetailPage({ detailData, id }) {
  const router = useRouter();
  const [data, setData] = useState([]);

  const getDataLandingPage = useCallback(async () => {
    const req = await getData("api/v1/participants/landing-page");
    setData(req.data);
  }, []);

  useEffect(() => {
    getDataLandingPage();
  }, []);

  const handleChekout = () => {
    const token = Cookies.get('token')
    if (!token) {
      return router.push('/signin')
    } else {
      router.push(`/checkout/${id}`)
    }
  }

  return (
    <>
      <Head>
        <title>Semina | Detail Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-navy">
        <Navbar />
      </section>
      <div className="preview-image bg-navy text-center">
        <img
          src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${detailData.cover}`}
          className="img-content"
          alt="semina"
        />
      </div>

      <div className="details-content container">
        <div className="d-flex flex-wrap justify-content-lg-center gap">
          <div className="d-flex flex-column description">
            <div className="headline">{detailData.title}</div>
            <div className="event-details">
              <h6>Event Details</h6>
              <p className="details-paragraph">{detailData.about}</p>
            </div>
            <div className="keypoints">
              {detailData.keyPoint.map((item, index) => (
                <div className="d-flex align-items-start gap-3" key={index}>
                  <img src="/icons/ic-check.svg" alt="semina" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="map-location">
              <h6>Event Location</h6>
              <div className="map-placeholder">
                <div className="maps">
                  <img src="/images/maps.png" alt="" />
                  <div
                    className="absolute d-flex justify-content-center align-items-center"
                    id="hoverMe"
                  >
                    <a href="#" className="btn-navy" id="btn-maps">
                      View in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column card-event">
            <h6>Your Speaker</h6>
            <div className="d-flex align-items-center gap-3 mt-3">
              <img
                src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${detailData?.speaker?.avatar}`}
                alt="semina"
                width="60"
              />
              <div>
                <div className="speaker-name">{detailData?.speaker?.name}</div>
                <span className="occupation">{detailData?.speaker?.role}</span>
              </div>
            </div>
            <hr />
            <h6>Get Ticket</h6>
            <div className="price my-3">
              ${detailData.price === 0 ? "free" : `${detailData.price}`}
              <span>/person</span>
            </div>
            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-marker.svg" alt="semina" />{" "}
              {detailData.venueName}
            </div>
            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-time.svg" alt="semina" />{" "}
              {moment(detailData.date).format("HH.MM A")}
            </div>
            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-calendar.svg" alt="semina" />{" "}
              {formatDate(detailData.date)}
            </div>
            {detailData.stock !== 0 && (
              <Button
                variant="btn-green"
                action={handleChekout}
              >
                Join Now
              </Button>
            )}
          </div>
        </div>
      </div>
      <Brand />
      <CardEvent data={data} title="Similiar Events" subTitle="Next One" />
      <Stories />
      <Statistic />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const req = await getData(`api/v1/participants/detail-page/${params.id}`);
  const res = req.data;

  return {
    props: {
      detailData: res,
      id: params.id
    },
  };
}
