import { CheckIcon, PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";

const OrderCard = ({
  typeText,
  date,
  id,
  name,
  email,
  phone,
  city,
  division,
  clickHandler,
}) => {
  return (
    <div onClick={clickHandler} className="order-card-wrapper group">
      <div className="action-btn-container group-hover:inline">
        <button className="group call btn rounded-tr-md " title="call to custoemer">
          <a href={`tel:+880${phone}`}>
            <PhoneIcon
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-green-400 group-hover:text-green-600 icon"
            />
          </a>
        </button>
        <button className="group accept btn" title="accept order">
          <CheckIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-green-400 group-hover:text-green-600 icon"
          />
        </button>
        <button className="group reject btn" title="reject order">
          <XMarkIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-red-400 group-hover:text-red-600 icon"
          />
        </button>
      </div>
      <div className="order-details-container">
        {date ? (
          <div className="details date">
            <label>{typeText}</label> <h3 className="value">{date}</h3>
          </div>
        ) : null}
        {id ? (
          <div className="details id">
            <label>id</label> <h3 className="value">{id}</h3>
          </div>
        ) : null}
        {name ? (
          <div className="details name">
            <label>name</label> <h3 className="value">{name}</h3>
          </div>
        ) : null}
        {email ? (
          <div className="details email">
            <label>email</label> <h3 className="value">{email.slice(0, 35)}</h3>
          </div>
        ) : null}
        {phone ? (
          <div className="details phone">
            <label>phone</label> <h3 className="value">{"0" + phone}</h3>
          </div>
        ) : null}
        {city ? (
          <div className="details city">
            <label>city</label> <h3 className="value">{city}</h3>
          </div>
        ) : null}
        {division ? (
          <div className="details division">
            <label>division</label> <h3 className="value">{division}</h3>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderCard;
