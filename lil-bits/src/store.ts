interface OrderState {
  order: {
    date?: string;
    people?: number;
    email?: string;
    dishes?: any[];
    drinks?: any[];
  };
}

const initialState: OrderState = {
  order: {},
};

const UPDATE_ORDER = 'UPDATE_ORDER';

interface UpdateOrderAction {
  type: typeof UPDATE_ORDER;
  payload: Partial<OrderState['order']>;
}

type OrderActionTypes = UpdateOrderAction;

const orderReducer = (state = initialState, action: OrderActionTypes): OrderState => {
  switch (action.type) {
    case UPDATE_ORDER:
      return { ...state, order: { ...state.order, ...action.payload } };
    default:
      return state;
  }
};
