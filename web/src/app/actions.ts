const response = (status: number, data?: any) => {
	if (status >= 200 && status < 300) {
		return {
			type: "SUCCESS",
			data,
		};
	} else {
		return { type: "ERROR", data };
	}
};

export const convertAudio = (payload: FormData) => {
    
};
