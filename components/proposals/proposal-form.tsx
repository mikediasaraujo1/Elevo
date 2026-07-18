"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  ProposalPreview,
  type ProposalPreviewData,
} from "@/components/proposals/proposal-preview";
import { TextArea, TextInput } from "@/components/proposals/form-fields";
import { ButtonGold } from "@/components/ui/button-gold";
import { GlassCard } from "@/components/ui/glass-card";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { createClient } from "@/lib/supabase/client";
import { generateProposalSlug } from "@/lib/utils";

interface PhotoItem {
  id: string;
  url: string;
  uploading?: boolean;
}

const INITIAL_PREVIEW: ProposalPreviewData = {
  titulo: "",
  endereco: "",
  bairro: "",
  cidade: "",
  preco: "",
  descricao: "",
  photos: [],
};

export function ProposalForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [preview, setPreview] = useState<ProposalPreviewData>(INITIAL_PREVIEW);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updatePreview(field: keyof ProposalPreviewData, value: string) {
    setPreview((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePhotoUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const tempId = crypto.randomUUID();
      setPhotos((prev) => [...prev, { id: tempId, url: "", uploading: true }]);
      setUploadingCount((c) => c + 1);

      try {
        const url = await uploadToCloudinary(file);
        setPhotos((prev) => {
          const updated = prev.map((p) =>
            p.id === tempId ? { id: tempId, url } : p
          );
          setPreview((pv) => ({
            ...pv,
            photos: updated.filter((p) => p.url).map((p) => p.url),
          }));
          return updated;
        });
      } catch (err) {
        setPhotos((prev) => prev.filter((p) => p.id !== tempId));
        setError(err instanceof Error ? err.message : "Erro ao enviar foto.");
      } finally {
        setUploadingCount((c) => c - 1);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setPreview((pv) => ({
        ...pv,
        photos: updated.filter((p) => p.url).map((p) => p.url),
      }));
      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (uploadingCount > 0) {
      setError("Aguarde o upload das fotos terminar.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const titulo = formData.get("titulo") as string;
    const endereco = formData.get("endereco") as string;
    const bairro = formData.get("bairro") as string;
    const cidade = formData.get("cidade") as string;
    const preco = Number(formData.get("preco"));
    const area_m2 = formData.get("area_m2")
      ? Number(formData.get("area_m2"))
      : null;
    const quartos = formData.get("quartos")
      ? Number(formData.get("quartos"))
      : null;
    const banheiros = formData.get("banheiros")
      ? Number(formData.get("banheiros"))
      : null;
    const vagas = formData.get("vagas") ? Number(formData.get("vagas")) : null;
    const descricao = (formData.get("descricao") as string) || null;

    const photoUrls = photos.filter((p) => p.url).map((p) => p.url);

    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Sessão expirada. Faça login novamente.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("proposals").insert({
      user_id: user.id,
      slug: generateProposalSlug(),
      titulo,
      endereco,
      bairro,
      cidade,
      preco,
      area_m2,
      quartos,
      banheiros,
      vagas,
      descricao,
      fotos: photoUrls,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <GlassCard hover>
          <p className="section-label mb-5">Informações básicas</p>
          <div className="space-y-5">
            <TextInput
              id="titulo"
              name="titulo"
              label="Título"
              required
              placeholder="Apartamento 3 quartos com vista"
              onChange={(e) => updatePreview("titulo", e.target.value)}
            />
            <TextArea
              id="descricao"
              name="descricao"
              label="Descrição"
              placeholder="Descreva o imóvel, diferenciais e condições..."
              onChange={(e) => updatePreview("descricao", e.target.value)}
            />
          </div>
        </GlassCard>

        <GlassCard hover>
          <p className="section-label mb-5">Localização</p>
          <div className="space-y-5">
            <TextInput
              id="endereco"
              name="endereco"
              label="Endereço"
              required
              placeholder="Rua, número"
              onChange={(e) => updatePreview("endereco", e.target.value)}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                id="bairro"
                name="bairro"
                label="Bairro"
                required
                placeholder="Jardins"
                onChange={(e) => updatePreview("bairro", e.target.value)}
              />
              <TextInput
                id="cidade"
                name="cidade"
                label="Cidade"
                required
                placeholder="São Paulo"
                onChange={(e) => updatePreview("cidade", e.target.value)}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard hover>
          <p className="section-label mb-5">Detalhes</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              id="preco"
              name="preco"
              label="Preço (R$)"
              type="number"
              required
              min={0}
              step={1}
              placeholder="850000"
              onChange={(e) => updatePreview("preco", e.target.value)}
            />
            <TextInput
              id="area_m2"
              name="area_m2"
              label="Área (m²)"
              type="number"
              min={0}
              step={0.01}
              placeholder="120"
            />
            <TextInput
              id="quartos"
              name="quartos"
              label="Quartos"
              type="number"
              min={0}
              step={1}
              placeholder="3"
            />
            <TextInput
              id="banheiros"
              name="banheiros"
              label="Banheiros"
              type="number"
              min={0}
              step={1}
              placeholder="2"
            />
            <TextInput
              id="vagas"
              name="vagas"
              label="Vagas"
              type="number"
              min={0}
              step={1}
              placeholder="2"
            />
          </div>
        </GlassCard>

        <GlassCard hover>
          <p className="section-label mb-5">Fotos</p>
          <p className="mb-4 text-sm text-[var(--text-secondary)]">
            Adicione fotos do imóvel. Elas serão enviadas para a nuvem automaticamente.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handlePhotoUpload(e.target.files)}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingCount > 0}
            className="dropzone-elevo disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploadingCount > 0
              ? `Enviando ${uploadingCount} foto(s)...`
              : "Clique para adicionar fotos"}
          </button>

          {photos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--gold-border)] bg-black/30"
                >
                  {photo.uploading ? (
                    <div className="flex h-full items-center justify-center text-xs text-[var(--text-secondary)]">
                      Enviando...
                    </div>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute right-1 top-1 rounded-md bg-black/80 px-2 py-1 text-xs text-red-300 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        Remover
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-[10px] border border-[var(--gold-border)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--gold-border-strong)] hover:bg-[var(--surface-hover)]"
          >
            Cancelar
          </Link>
          <ButtonGold
            type="submit"
            disabled={loading || uploadingCount > 0}
            className="!text-sm"
          >
            {loading ? "Salvando..." : "Salvar proposta"}
          </ButtonGold>
        </div>
      </form>

      <div className="hidden lg:block">
        <ProposalPreview data={preview} />
      </div>
    </div>
  );
}
