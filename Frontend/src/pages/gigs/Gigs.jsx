import React, { useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Gigs = () => {
	const [sort, setSort] = useState("sales");
	const [openRightMenu, setOpenRightMenu] = useState(false);

	const minRef = useRef();
	const maxRef = useRef();

	const { search } = useLocation();

	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["repoData"],
		queryFn: () =>
			newRequest
				.get(
					search === ""
						? `/gigs/`
						: `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`,
				)
				.then((res) => {
					return res.data;
				}),
	});

	const reSort = (type) => {
		setSort(type);
		setOpenRightMenu(false);
	};

	useEffect(() => {
		refetch();
	}, [sort]);

	const apply = () => {
		refetch();
	};

	return (
		<div className="gigs">
			<div className="container">
				<span className="breadcrumbs">
					Liverr &gt; Graphics & Design &gt;
				</span>
				<h1>AI Artists</h1>
				<p>
					Explore the boundaries of art and technology with
					Liverr&apos;s AI artists
				</p>
				<div className="menu">
					<div className="left">
						<span>Budget</span>
						<input
							ref={minRef}
							type="text"
							placeholder="min"></input>
						<input
							ref={maxRef}
							type="text"
							placeholder="max"></input>
						<button onClick={apply}>Apply</button>
					</div>
					<div className="right">
						<span className="sortBy">SortBy</span>
						<span className="sortType">
							{sort === "sales" ? "Best Selling" : "Newest"}
						</span>
						<img
							src="./img/down.png"
							alt="/"
							onClick={() => setOpenRightMenu(!openRightMenu)}
						/>
						{openRightMenu && (
							<div className="rightMenu">
								{sort === "sales" ? (
									<span onClick={() => reSort("createdAt")}>
										Newest
									</span>
								) : (
									<span onClick={() => reSort("sales")}>
										Best Selling
									</span>
								)}
								<span onClick={() => reSort("sales")}>
									Popular
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="cards">
					{isLoading
						? "loading"
						: error
						? "Something went wrong!"
						: data.map((gig) => (
								<GigCard key={gig._id} item={gig} />
						  ))}
				</div>
			</div>
		</div>
	);
};

export default Gigs;
