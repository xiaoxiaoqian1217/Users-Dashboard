import * as usersService from '../services/users'
export default {
    namespace: 'users',
    state: {
        list: [],
        total: 0,
        page: 1
    },
    reducers: {
        save(state, { payload: { data: list, total, page } }) {
            return { ...state, list, total, page }
        }
    },
    effects: {
        *fetch({ payload: { page } }, { call, put }) {
            const { data, headers } = yield call(usersService.fetch, { page });
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count']),
                    page: parseInt(page, 10),
                }
            })
        },
        *remove({ payload: id }, { call, put, select }) {
            yield call(usersService.remove, id);
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } })
        },
        *patch ({payload:{id,values}},{call,put,select}){
           yield call(usersService.patch,id,values);
           const page = yield select(state => state.users.page);
           yield put({ type: 'fetch', payload: { page } });
        //    const page = yield select (state => )

        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/users') {
                    dispatch({ type: "fetch", payload: query })
                }
            })
        }
    }
}
