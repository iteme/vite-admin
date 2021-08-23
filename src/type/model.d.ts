declare interface BasePageQuery {
  page: number;
  pageSize: number;
  total?: number;
}

declare interface BaseResult<T extends unknown> {
  success?: boolean;
  code: number;
  msg: string;
  result: T;
}

declare interface MenuItem {
  code: string;
  name: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}
