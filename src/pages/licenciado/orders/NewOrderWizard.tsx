import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ordersApi } from "@/features/orders/api";
import { contentApi } from "@/features/content/api";
import { Product } from "@/features/content/types";
import { CreateOrderPayload } from "@/features/orders/types";

export default function NewOrderWizard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await contentApi.getProducts();
      setProducts(res.data);
    } catch (error) {
      toast({ title: "Erro ao carregar produtos", variant: "destructive" });
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      const payload: CreateOrderPayload = {
        items: [{ productId: selectedProduct, quantity }],
        shippingOptionId: "PAC",
        paymentMethod: "BOLETO",
        shippingAddressId: "default" // Simplified
      };
      
      await ordersApi.create(payload);
      toast({ title: "Pedido criado com sucesso!" });
      navigate("/licenciado/orders");
    } catch (error) {
      toast({ title: "Erro ao criar pedido", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Novo Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Produto</label>
            <select 
              className="w-full border rounded p-2"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.title} - R$ {p.price}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quantidade</label>
            <Input 
              type="number" 
              min={1} 
              value={quantity} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))} 
            />
          </div>

          <Button 
            className="w-full" 
            onClick={handleCreateOrder} 
            disabled={loading || !selectedProduct}
          >
            {loading ? "Processando..." : "Criar Pedido"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
