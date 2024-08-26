import React from "react";

import { Button } from "../../atoms/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../atoms/card";
import tour from "./tour";

const TourDisplay = (props: {
	children: React.ReactNode;
	title?: string;
	description?: string;
}) => {
	const ctx = tour.useContext();
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.description}</CardDescription>
			</CardHeader>
			<CardContent>{props.children}</CardContent>
			<CardFooter>
				{ctx.current < ctx.nodes.size ? (
					<div className="flex w-full justify-between">
						<Button variant="outline" onClick={ctx.close}>
							Close
						</Button>
						<div>
							<Button onClick={ctx.previous}>Previous</Button>
							<Button onClick={ctx.next}>Next</Button>
						</div>
					</div>
				) : (
					<div className="flex w-full justify-end">
						<Button onClick={ctx.previous}>Previous</Button>
						<Button className="bg-green-800" onClick={ctx.close}>
							Finish
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
};
