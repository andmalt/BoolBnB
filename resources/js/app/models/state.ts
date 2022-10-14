import { types } from "mobx-state-tree";


const Auth = types.model({
    name: types.string,
    email: types.string,
    token: types.string,
    loading: types.boolean,
    error: types.boolean
})
    .actions(self => ({
        loading() {
            self.loading = true;
            self.error = false;
        }
    }))
