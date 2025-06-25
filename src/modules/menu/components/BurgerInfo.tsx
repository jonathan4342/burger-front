import type { MenuItem } from "../Menu.interface";

interface Props {
  burger: MenuItem;
}

export const BurgerInfo = ({ burger }: Props) => {
  const { nombre, descripcion,precio } = burger;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{nombre}</h3>
        <p className="text-sm text-gray-600">{descripcion}</p>
      </div>
      <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
        ${precio.toFixed(2)}
      </span>
    </div>
  );
};
