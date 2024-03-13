import { menuOptions } from "@/helpers/menu";
import { ReactElement, createContext, useState } from "react";

type options = menuOptions;

export type UseMiscContextType = {
	selectedGroup: options;
	setSelectedGroup: React.Dispatch<React.SetStateAction<options>>;
};

const initContextState: UseMiscContextType = {
	selectedGroup: menuOptions.all,
	setSelectedGroup: () => {},
};

const MiscContext = createContext<UseMiscContextType>(initContextState);

type ChildrenType = {
	children?: ReactElement | ReactElement[];
};

export const MiscProvider = ({ children }: ChildrenType): ReactElement => {
	const [selectedGroup, setSelectedGroup] = useState<options>(menuOptions.all);

	return (
		<MiscContext.Provider value={{ selectedGroup, setSelectedGroup }}>
			{children}
		</MiscContext.Provider>
	);
};

export default MiscContext;
