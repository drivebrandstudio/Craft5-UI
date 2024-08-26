import React from "react";

import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/input";
import { TourDisplay } from "./TourExample";
import { TourFactory } from "./TourFactory";

const TourStops = () => {
	const tour = TourFactory(["example1", "example2", "emailInput"]);
	const ctx = tour.useContext();
	return (
		<div className="flex h-96 w-full items-center justify-center">
			<div className="absolute bottom-2 left-2 flex gap-2">
				<tour.TourFocus
					name="example1"
					tourRender={
						<TourDisplay title="Create Incident">
							<h1>This button creates an incident</h1>
							<p>helpful text about this button</p>
						</TourDisplay>
					}
				>
					<Button>Create Incident</Button>
				</tour.TourFocus>
				<tour.TourFocus
					name="example2"
					tourRender={
						<TourDisplay title="Update Incident">
							<h1>This button pushes your updates</h1>
							<p>helpful text about this button</p>
						</TourDisplay>
					}
				>
					<Button>Update Incident</Button>
				</tour.TourFocus>
			</div>

			<div>
				<tour.TourFocus
					name="emailInput"
					tourRender={
						<TourDisplay title="Email Input">
							<h1>This is where you put incident info</h1>
							<p>helpful text about this input</p>
						</TourDisplay>
					}
				>
					<Input type="email" placeholder="Email" />
				</tour.TourFocus>
			</div>
			<div className="absolute bottom-2 right-2">
				<Button onClick={ctx.open}>Open Tour</Button>
			</div>
		</div>
	);
};

export default TourStops;
