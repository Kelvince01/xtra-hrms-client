export interface ITableColumn {
  name: string;
  dataKey?: string;
  position?: 'right' | 'left';
  isSortable?: boolean;
}
