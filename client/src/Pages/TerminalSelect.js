import Header from "../Components/Header";
import Terminals from "../Components/Terminals";

export default function TerminalSelect() {
  return (
    <div>
      <Header /> {/*basic navbar without functionality*/}
      <Terminals /> {/*rendering the terminal's data to a table*/}
    </div>
  );
}
