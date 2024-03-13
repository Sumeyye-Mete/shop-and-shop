import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { menuOptions } from "@/helpers/menu";
import useMisc from "@/hooks/useMisc";
import { useNavigate } from "react-router-dom";

const SelectMenu = () => {
	const { selectedGroup, setSelectedGroup } = useMisc();
	const navigate = useNavigate();

	return (
		<Select
			defaultValue={menuOptions.all}
			onValueChange={(val: menuOptions) => {
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				navigate("/");
				setSelectedGroup(val);
			}}
			value={selectedGroup}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="ALL" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={menuOptions.all}>ALL</SelectItem>
				<SelectItem value={menuOptions.decor}>DECOR</SelectItem>
				<SelectItem value={menuOptions.office}>OFFICE</SelectItem>
				<SelectItem value={menuOptions.livingRoom}>LIVING ROOM</SelectItem>
				<SelectItem value={menuOptions.bedroom}>BEDROOM</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default SelectMenu;
