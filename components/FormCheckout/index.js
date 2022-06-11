import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getData, postData } from "../../utils/fetchData";
import Cookies from "js-cookie";
import Button from "../Button";
import { toast } from "react-toastify";

export default function FormCheckout() {
  const router = useRouter();
  const token = Cookies.get("token");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    payment: "",
    event: router.query.id,
  });

  const [payments, setPayments] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getData("api/v1/participants/payments");
      res.data.forEach((res) => {
        res.isChecked = false;
      });
      setPayments(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let paymentId = "";
    payments.filter((p) => {
      if (p.isChecked) {
        paymentId = p._id;
      }
    });

    setForm({ ...form, payment: paymentId });
  }, [payments]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangePayment = (e, i) => {
    const _temp = [...payments];

    _temp[i].isChecked = e.target.checked;

    _temp.forEach((t) => {
      if (t._id !== e.target.value) {
        t.isChecked = false;
      }
    });

    setPayments(_temp);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        event: form.event,
        payment: form.payment,
        personalDetail: {
          firstName: form.firstName,
          lastName: form.lastName,
          role: form.role,
          email: form.email,
        },
      };
      const res = await postData("api/v1/participants/checkout", payload, token);
      if (res.data) {
        toast.success("Berhasil checkout", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <form action="" className="container form-semina">
      <div className="personal-details">
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
          <div className="form-title col-lg-8">
            <span>01</span>
            <div>Personal Details</div>
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center">
          <div className="mb-4 col-lg-4">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              placeholder="First name here"
              className="form-control"
              id="first_name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 col-lg-4">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last name here"
              className="form-control"
              id="last_name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-12 justify-content-center">
          <div className="mb-4 col-lg-4">
            <label htmlFor="email_address" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email_address"
              placeholder="semina@bwa.com"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 col-lg-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              placeholder="Product Designer"
              name="role"
              value={form.role}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="payment-method mt-4">
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
          <div className="form-title col-lg-8">
            <span>02</span>
            <div>Payment Method</div>
          </div>
        </div>
        <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center gy-4 gy-md-0">
          {payments.map((payment, index) => (
            <div className="col-lg-4" key={payment._id}>
              <label className="payment-radio h-100 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${payment.imageUrl}`}
                    alt=""
                    style={{
                      width: "100px",
                      height: "80px",
                    }}
                  />
                  <div>{payment.type}</div>
                </div>
                <input
                  type="radio"
                  checked={payment.isChecked}
                  value={payment._id}
                  name="radio"
                  onChange={(e) => handleChangePayment(e, index)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column align-items-center footer-payment gap-4">
        <Button variant="btn-green" action={() => handleSubmit()}>
          Pay Now
        </Button>
        <div>
          <img src="/icons/ic-secure.svg" alt="" />
          <span>Your payment is secure and encrypted</span>
        </div>
      </div>
    </form>
  );
}
