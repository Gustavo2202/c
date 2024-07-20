import "./PriorityOption.css";
import Radio from "@mui/material/Radio";
import { withStyles } from "@material-ui/core/styles";

const CustomRadio = withStyles({
  root: {
    color: "#0ea5e9",
    "&$checked": { color: "#10b981" },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export function PriorityOption({selectValue, handleChange  }) {
  return (
    <div className="radiosOptions">
      <div>
        <CustomRadio
          checked={selectValue === "all"}
          onChange={e => handleChange(e.target)}
          value="all"
        />
        <span>Todos</span>
      </div>
      <div>
        <CustomRadio
          checked={selectValue === "true"}
          onChange={e => handleChange(e.target)}
          value="true"
        />
        <span>Prioridade</span>
      </div>
      <div>
        <CustomRadio
          checked={selectValue === "false"}
          onChange={e => handleChange(e.target)}
          value="false"
        />
        <span>Normal</span>
      </div>
    </div>
  );
}
