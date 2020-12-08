import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.css";

export class Card extends Component {
  getTimeByKey = (timestamp, key) => {
    const options = {
      minutes: new Date(timestamp).getMinutes(),
      hours: new Date(timestamp).getHours()
    };

    const value = options[key];

    if (value < 10) {
      return `0${value}`;
    }

    return value;
  };

  getDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}ч ${minutes}м`;
  };

  getAllTime = (timestamp) => {
    return `${this.getTimeByKey(timestamp, "hours")}:${this.getTimeByKey(timestamp, "minutes")}`;
  };

  getDestinationTime = ({ date, duration }) => {
    const originTimeStamp = Date.parse(date);
    const durationMs = duration * 60 * 1000;

    return originTimeStamp + durationMs;
  };

  getCardRows = ({ segments }) => {
    return segments.map(({ date, destination, duration, origin, stops }, key) => {
      const destinationTime = this.getDestinationTime({ date, duration });

      return (
        <div key={key} className="row">
          <div className="row_titles">
            <span className="col_title">
              {origin} – {destination}
            </span>
            <span className="col_title">В пути</span>
            <span className="col_title">{this.getTransfersTitle(stops)}</span>
          </div>
          <div className="row_data">
            <span className="col_data">
              {this.getAllTime(date)} – {this.getAllTime(destinationTime)}
            </span>
            <span className="col_data">{this.getDuration(duration)}</span>
            <span className="col_data">{this.getTransfersData(stops)}</span>
          </div>
        </div>
      );
    });
  };

  getTransfersData = (transfers) => {
    if (!transfers.length) {
      return "–";
    }

    return transfers.join(", ");
  };

  getTransfersTitle = (transfers) => {
    if (!transfers.length) {
      return "0 пересадок";
    } else if (transfers.length === 1) {
      return "1 пересадка";
    }

    return `${transfers.length} пересадки`;
  };

  render() {
    const { price, carrier: code, segments } = this.props;

    return (
      <div className="card_container">
        <div className="main_info">
          <span className="price">{price} P</span>
          <div className="company_logo">
            <img src={`https://pics.avs.io/99/36/${code}.png`} alt="company logo" />
          </div>
        </div>
        <div className="additional_info">{this.getCardRows({ segments })}</div>
      </div>
    );
  }
}

Card.propTypes = {
  price: PropTypes.number,
  carrier: PropTypes.string,
  segments: PropTypes.array
};
