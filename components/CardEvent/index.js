import CardTitle from "../CardTitle";
import Link from "next/link";
import { formatDate } from "../../utils/formatDate";
// import { formatDate } from '../../utils/formatDate';

export default function CardEvent({ data, title, subTitle }) {
  return (
    <section className="grow-today">
      <div className="container">
        <CardTitle subTitle={subTitle} title={title} />
        <div className="mt-5 row gap">
          {data.map((data) => (
            <div className="col-lg-3 col-md-6 col-12" key={data._id}>
              <div className="card-grow h-100">
                <span className="badge-pricing">
                  {data.price === 0 ? "free" : `$${data.price}`}
                </span>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${data.cover}`}
                  alt="semina"
                />
                <div className="card-content">
                  <div className="card-title">{data.title}</div>
                  <div className="card-subtitle">{data.category.name}</div>
                  <div className="description">
                    {data.venueName}, {formatDate(data.date)}
                  </div>
                  <Link href={`/detail/${data._id}`}>
                    <a className="stretched-link"></a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
