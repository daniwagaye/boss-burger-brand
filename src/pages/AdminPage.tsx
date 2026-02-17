import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, LogOut, Eye, EyeOff, Star, Download, GripVertical, Pencil } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type MenuItem = Tables<"menu_items">;
type Category = Tables<"categories">;

export default function AdminPage() {
  const { user, isAdmin, loading, signIn, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground font-sans">Loading...</p></div>;
  if (!user) return <LoginForm onSignIn={signIn} />;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <p className="text-foreground font-sans text-lg">Access denied. Admin only.</p>
      <Button onClick={signOut} variant="outline">Sign Out</Button>
    </div>
  );

  return <AdminDashboard onSignOut={signOut} />;
}

function LoginForm({ onSignIn }: { onSignIn: (e: string, p: string) => Promise<string | null> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const err = await onSignIn(email, password);
    if (err) setError(err);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">
          BOSS<span className="text-primary">BURGER</span>
        </h1>
        <p className="text-muted-foreground font-sans text-center mb-8">Admin Login</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="font-sans">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password" className="font-sans">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-destructive font-sans text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const [{ data: cats }, { data: menuItems }] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("menu_items").select("*").order("sort_order"),
    ]);
    setCategories(cats || []);
    setItems(menuItems || []);
  };

  useEffect(() => { fetchData(); }, []);

  const deleteItem = async (id: string) => {
    await supabase.from("menu_items").delete().eq("id", id);
    toast.success("Item deleted");
    fetchData();
  };

  const toggleVisibility = async (item: MenuItem) => {
    await supabase.from("menu_items").update({ is_visible: !item.is_visible }).eq("id", item.id);
    fetchData();
  };

  const toggleFeatured = async (item: MenuItem) => {
    await supabase.from("menu_items").update({ is_featured: !item.is_featured }).eq("id", item.id);
    fetchData();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ categories, items }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "boss-burger-menu.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">
            BOSS<span className="text-primary">BURGER</span> <span className="text-muted-foreground font-sans text-sm font-normal ml-2">Admin</span>
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={exportJSON}>
              <Download size={16} /> Export
            </Button>
            <Button variant="ghost" size="sm" onClick={onSignOut}>
              <LogOut size={16} /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Menu Items</h2>
          <Button onClick={() => { setEditing(null); setShowForm(true); }}>
            <Plus size={16} /> Add Item
          </Button>
        </div>

        {showForm && (
          <ItemForm
            item={editing}
            categories={categories}
            onClose={() => { setShowForm(false); setEditing(null); }}
            onSave={() => { setShowForm(false); setEditing(null); fetchData(); }}
          />
        )}

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
              <GripVertical size={16} className="text-muted-foreground cursor-grab" />
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans font-semibold text-foreground truncate">{item.name}</h3>
                  {item.is_featured && <Star size={14} className="text-gold fill-gold" />}
                  {item.is_draft && <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-sans">Draft</span>}
                </div>
                <p className="text-muted-foreground text-sm font-sans">${Number(item.price).toFixed(2)} · {categories.find(c => c.id === item.category_id)?.name || "No category"}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleFeatured(item)} title="Toggle featured">
                  <Star size={18} className={item.is_featured ? "text-gold fill-gold" : "text-muted-foreground"} />
                </button>
                <button onClick={() => toggleVisibility(item)} title="Toggle visibility">
                  {item.is_visible ? <Eye size={18} className="text-foreground" /> : <EyeOff size={18} className="text-muted-foreground" />}
                </button>
                <button onClick={() => { setEditing(item); setShowForm(true); }}>
                  <Pencil size={18} className="text-foreground" />
                </button>
                <button onClick={() => deleteItem(item.id)}>
                  <Trash2 size={18} className="text-destructive" />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-center text-muted-foreground font-sans py-12">No menu items yet. Add your first item!</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemForm({
  item,
  categories,
  onClose,
  onSave,
}: {
  item: MenuItem | null;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [price, setPrice] = useState(String(item?.price || ""));
  const [categoryId, setCategoryId] = useState(item?.category_id || "");
  const [ingredients, setIngredients] = useState(item?.ingredients?.join(", ") || "");
  const [tags, setTags] = useState(item?.tags?.join(", ") || "");
  const [isFeatured, setIsFeatured] = useState(item?.is_featured || false);
  const [isDraft, setIsDraft] = useState(item?.is_draft || false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) { toast.error("Name is required"); return; }
    setSaving(true);

    let imageUrl = item?.image_url || null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("food-images").upload(path, imageFile);
      if (uploadErr) { toast.error("Image upload failed"); setSaving(false); return; }
      const { data: { publicUrl } } = supabase.storage.from("food-images").getPublicUrl(path);
      imageUrl = publicUrl;
    }

    const payload = {
      name,
      description,
      price: parseFloat(price) || 0,
      category_id: categoryId || null,
      ingredients: ingredients.split(",").map((s) => s.trim()).filter(Boolean),
      tags: tags.split(",").map((s) => s.trim()).filter(Boolean),
      is_featured: isFeatured,
      is_draft: isDraft,
      image_url: imageUrl,
    };

    if (item) {
      await supabase.from("menu_items").update(payload).eq("id", item.id);
      toast.success("Item updated");
    } else {
      await supabase.from("menu_items").insert(payload);
      toast.success("Item created");
    }

    setSaving(false);
    onSave();
  };

  return (
    <div className="mb-8 p-6 rounded-xl border border-border bg-card">
      <h3 className="font-display text-xl font-bold text-foreground mb-4">{item ? "Edit Item" : "Add New Item"}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="font-sans">Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label className="font-sans">Price ($)</Label>
          <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Label className="font-sans">Description</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <Label className="font-sans">Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="font-sans">Image</Label>
          <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        </div>
        <div>
          <Label className="font-sans">Ingredients (comma-separated)</Label>
          <Input value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </div>
        <div>
          <Label className="font-sans">Tags (comma-separated)</Label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="spicy, cheese, vegetarian" />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
            <Label className="font-sans">Featured</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={isDraft} onCheckedChange={setIsDraft} />
            <Label className="font-sans">Draft</Label>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
}
