import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;
        let state = routerState.root;
        let params = {...state.params};
        while (state.firstChild) {
            state = state.firstChild;
            params = { ...params, ...state.params };
        }
    return { url, params, queryParams };
  }
}
