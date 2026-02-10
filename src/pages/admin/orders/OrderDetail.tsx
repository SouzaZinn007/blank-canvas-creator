import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  return <div className="p-6">Detalhes do Pedido {id} (Placeholder)</div>;
}
