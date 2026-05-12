"use client";

import React, { useRef } from "react";
import { Image, Spin, message } from "antd";
import { EditOutlined, PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  useGetBannerQuery,
  useUpdateLoginBannerMutation,
  useUpdateSignUpBannerMutation,
} from "@/redux/api/bannerApi";

/* ── Types ────────────────────────────────────────────────────────── */
interface BannerCardProps {
  label: string;
  imageUrl: string | undefined;
  onEdit: () => void;
  loading: boolean;
}

/* ── Individual Banner Card ───────────────────────────────────────── */
function BannerCard({ label, imageUrl, onEdit, loading }: BannerCardProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </p>

      {/* Image wrapper */}
      <div className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 aspect-video">

        {/* Ant Design Image with built-in preview/zoom */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={label}
            width="100%"
            height="100%"
            className="!w-full !h-full object-cover"
            style={{ display: "block" }}
           
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-300">
            <PictureOutlined style={{ fontSize: 40 }} />
            <span className="text-sm">No image uploaded</span>
          </div>
        )}

        {/* Edit overlay — slides in on group-hover */}
        <div
          className="
            absolute inset-0
            bg-black/0 group-hover:bg-black/40
            transition-all duration-300
            flex items-start justify-end p-3
            pointer-events-none group-hover:pointer-events-auto
          "
        >
          <button
            onClick={onEdit}
            disabled={loading}
            title={`Update ${label}`}
            className="
              flex items-center gap-1.5
              px-3 py-1.5
              rounded-lg
              bg-white/90 hover:bg-white
              text-slate-800 text-sm font-semibold
              shadow-md
              opacity-0 group-hover:opacity-100
              translate-y-1 group-hover:translate-y-0
              transition-all duration-200
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {loading ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 13 }} spin />} />
            ) : (
              <EditOutlined style={{ fontSize: 13 }} />
            )}
            <span>{loading ? "Uploading…" : "Edit"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── BannerContainer ──────────────────────────────────────────────── */
export default function BannerContainer() {
  const { data, isLoading: fetching } = useGetBannerQuery(undefined);
  const [updateLogin, { isLoading: updatingLogin }] = useUpdateLoginBannerMutation();
  const [updateSignup, { isLoading: updatingSignup }] = useUpdateSignUpBannerMutation();

  const loginRef = useRef<HTMLInputElement>(null);
  const signupRef = useRef<HTMLInputElement>(null);

  const [messageApi, contextHolder] = message.useMessage();

  /** Opens hidden file input → builds FormData → fires mutation */
  const handleUpdate = (
    inputRef: React.RefObject<HTMLInputElement>,
    mutate: (formData: FormData) => { unwrap: () => Promise<void> },
    label: string
  ): void => {
    if (!inputRef.current) return;

    inputRef.current.value = "";
    inputRef.current.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("banner", file);


      try {
        await mutate(formData).unwrap();
        messageApi.success(`${label} updated successfully!`);
      } catch {
        messageApi.error(`Failed to update ${label}. Please try again.`);
      }
    };

    inputRef.current.click();
  };

  const bannerData = data?.data;

  return (
    <div className="">
      {contextHolder}

      {/* Section header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">
          Auth Banners
        </h2>
        <p className="text-sm text-slate-500">
          Update the images displayed on the Login and Sign-Up screens.
        </p>
      </div>

      {/* Skeleton loaders while fetching */}
      {fetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="h-3 w-24 rounded-full bg-slate-200 animate-pulse" />
              <div className="aspect-video rounded-2xl bg-slate-200 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        /* Wrap both images in PreviewGroup so Ant Design links their previews */
        <Image.PreviewGroup>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <BannerCard
              label="Login Banner"
              imageUrl={bannerData?.loginImage}
              loading={updatingLogin}
              onEdit={() => handleUpdate(loginRef, updateLogin, "Login Banner")}
            />
            <BannerCard
              label="Sign-Up Banner"
              imageUrl={bannerData?.signupImage}
              loading={updatingSignup}
              onEdit={() => handleUpdate(signupRef, updateSignup, "Sign-Up Banner")}
            />
          </div>
        </Image.PreviewGroup>
      )}

      {/* Hidden file inputs */}
      <input ref={loginRef} type="file" accept="image/*" className="hidden" />
      <input ref={signupRef} type="file" accept="image/*" className="hidden" />
    </div>
  );
}