export const INITIAL_STATE = {
    avengerSerieList: []
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "ADD_AVENGERS":
            return {
                avengersSerieList: [...state.avengerSerieList, action.payload]
            };
        default:
            return state
    }
}
