import nodemailer from "nodemailer";

export async function handleIncident(ownerMail: string, transportationTask: any, incident: any) {
	try {
		const mailAccount = await nodemailer.createTestAccount();
		const env = process.env as any;
	
		const transporter = nodemailer.createTransport({
			host: env.INCIDENT_MAIL_HOST,
			port: env.INCIDENT_MAIL_PORT,
			secure: false,
			auth: {
				user: env.INCIDENT_MAIL_USERNAME || mailAccount.user,
				pass: env.INCIDENT_MAIL_PASSWORD || mailAccount.pass
			}
		});
	
		await transporter.sendMail({
			from: "noreply@smartetransportbox.com",
			to: ownerMail,
			subject: "New Incident on your delivery",
			text: `
			Hello,
	
			An incident occured for your delivery from ${transportationTask.fromLocation} to ${transportationTask.toLocation}!
	
			It was noticed by your monitoring module with the ID ${transportationTask.deviceID}.
	
			The ${incident.sensor} sensor reached a value of ${incident.value}.
	
			Regards,
			Your SmarteTransportBox Team
			`
		});
	} catch (e) {
		console.error("Sending alert mail failed: ", e);
	}
}