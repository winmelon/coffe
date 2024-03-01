import defaultCafe from "../assets/images/default-cafe.png";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import RadioGroupRating from "./rate";

function extractPageIdFromUrl(url) {
	// 切割 URL，以斜線為分隔符
	const parts = url.split("/");
	// 在 parts 中找到包含 "facebook.com" 的部分
	const facebookPartIndex = parts.findIndex((part) =>
		part.includes("facebook.com")
	);
	// 如果找到了包含 "facebook.com" 的部分
	if (facebookPartIndex !== -1) {
		// 取得 "facebook.com" 之後的部分
		const remainingParts = parts.slice(facebookPartIndex + 1);
		// 第一個元素就是頁面的 ID
		const pageId = remainingParts[0];
		// 返回頁面的 ID
		return pageId;
	} else {
		// 如果 URL 中沒有包含 "facebook.com"，返回空字符串
		return "";
	}
}

export default function RecipeReviewCard({ cafe }) {
	let url = cafe.url;
	url = extractPageIdFromUrl(url);
	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<Card
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					minHeight: "360px",
				}}
			>
				{/* 設置了最小高度 */}
				<CardHeader
					title={cafe.name}
					subheader={cafe.address}
					titleTypographyProps={{
						style: {
							display: "-webkit-box",
							overflow: "hidden",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: 2, // 限制標題為兩行
						},
					}}
					subheaderTypographyProps={{
						style: {
							display: "-webkit-box",
							overflow: "hidden",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: 1, // 限制副標題為一行
						},
					}}
					style={{ minHeight: "6em" }} // 根據需要設置最小高度，這裡假設標題最多2行，副標題1行
				/>
				<CardMedia
					component="img"
					image={"https://graph.facebook.com/" + url + "/picture?type=large"}
					onError={(e) => (e.target.src = defaultCafe)} // 當加載失敗時，替換為默認圖片
					alt={cafe.name}
					style={{
						height: "140px", // 設定圖片高度
						width: "100%", // 使圖片寬度填充容器
						objectFit: "contain", // 防止圖片過大時溢出容器
						objectPosition: "center",
					}}
				/>
				<CardContent style={{ flex: 1, overflow: "hidden" }}>
					{/* 防止内容溢出 */}
					<RadioGroupRating value={cafe.quiet} topic={"安靜"} />
					<RadioGroupRating value={cafe.tasty} topic={"美味"} />
					<RadioGroupRating value={cafe.cheap} topic={"CP值"} />
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
				</CardActions>
			</Card>
		</div>
	);
}
