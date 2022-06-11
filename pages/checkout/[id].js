import moment from "moment";
import Head from "next/head";
import Footer from "../../components/Footer";
import FormCheckout from "../../components/FormCheckout";
import Navbar from "../../components/Navbar";
import { getData } from "../../utils/fetchData";
import { formatDate } from "../../utils/formatDate";

export default function Checkout({detailData}) {
  return (
    <>
      <Head>
        <title>Semina | Checkout Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-navy">
        <div className="checkout container">
          <div className="text-center checkout-title">Invest In Yourself</div>

          <div className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5">
            <img
              src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${detailData.cover}`}
              className="event-image"
              alt="semina"
            />
            <div className="d-flex flex-column gap-3">
              <h5>
                {detailData.title}
              </h5>

              <div className="d-flex align-items-center gap-3">
                <img src="/icons/ic-marker-white.svg" alt="" />
                <span>{detailData.venueName}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <img src="/icons/ic-time-white.svg" alt="" />
                <span>{moment(detailData.date).format("HH.MM A")}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <img src="/icons/ic-calendar-white.svg" alt="" />
                <span>{formatDate(detailData.date)}</span>
              </div>
            </div>
            <div className="total-price">${detailData.price}</div>
          </div>

          <FormCheckout />
        </div>
      </section>

      <Footer />
    </>
  );
}

export async function getServerSideProps({req, params}) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    };
  }

  const request = await getData(`api/v1/participants/detail-page/${params.id}`)
  const res = request.data

  return {
    props: {
      detailData: res
    }
  }
}