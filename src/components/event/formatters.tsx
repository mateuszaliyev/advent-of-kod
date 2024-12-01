export const eventFormatters: ((event: React.ReactNode) => JSX.Element)[] = [
  (event) => (
    <>
      {"{:year "}
      {event}
      {"}"}
    </>
  ),
  (event) => (
    <>
      {"{year=>"}
      {event}
      {"}"}
    </>
  ),
  (event) => (
    <>
      {"/*"}
      {event}
      {"*/"}
    </>
  ),
  (event) => (
    <>
      {"<y>"}
      {event}
      {"</y>"}
    </>
  ),
  (event) => <>$year={event};</>,
  (event) => <>0.0.0.0:{event}</>,
  (event) => <>0x0000|{event}</>,
  (event) => <>int y={event};</>,
  (event) => (
    <>
      sub y{"{"}
      {event}
      {"}"}
    </>
  ),
  (event) => <>var y={event};</>,
  (event) => <>y({event})</>,
  (event) => <>λy.{event}</>,
];
