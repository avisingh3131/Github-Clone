import { ReplaySubject } from "rxjs";

export interface ExampleTab {
  label: string;
  content: ReplaySubject<any[]>;
}

