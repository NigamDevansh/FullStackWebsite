import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

const CatCard = ({ card }) => {
	let catType = "";
	switch (card.cat) {
		case "design":
			catType = "/gigs?cat=design";
			break;
		case "ai":
			catType = "/gigs?cat=ai";
			break;
		default:
			catType = "/gigs";
			break;
	}

	return (
		<Link to={catType}>
			<div className="catCard">
				<img src={card.img} alt="" />
				<span className="desc">{card.desc}</span>
				<span className="title">{card.title}</span>
			</div>
		</Link>
	);
};

export default CatCard;
