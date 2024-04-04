export default function AboutFeature({}) {
	return (
		<div className="m-4">
			{[
				{
					logo: <></>,
					title: "",
					description: "",
				},
			].map((item, index) => {
				return (
					<div className="" key={index}>
						{item.logo}
						<div>
							<h6>{item.title}</h6>
							<p>{item.description}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
