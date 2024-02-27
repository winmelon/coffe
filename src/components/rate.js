import * as React from "react";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const customIcons = {
	1: {
		icon: <SentimentVeryDissatisfiedIcon />,
		label: "Very Dissatisfied",
	},
	2: {
		icon: <SentimentDissatisfiedIcon />,
		label: "Dissatisfied",
	},
	3: {
		icon: <SentimentSatisfiedIcon />,
		label: "Neutral",
	},
	4: {
		icon: <SentimentSatisfiedAltIcon />,
		label: "Satisfied",
	},
	5: {
		icon: <SentimentVerySatisfiedIcon />,
		label: "Very Satisfied",
	},
};

function IconContainer(props) {
	const { value, ...other } = props;
	return <span {...other}> {customIcons[value].icon} </span>;
}

IconContainer.propTypes = {
	value: PropTypes.number.isRequired,
};

export default function RadioGroupRating({ value, topic }) {
	return (
		<>
			<Typography component="legend">{topic}</Typography>
			<Rating
				name="read-only"
				value={value}
				IconContainerComponent={IconContainer}
				readOnly
			/>
		</>
	);
}
