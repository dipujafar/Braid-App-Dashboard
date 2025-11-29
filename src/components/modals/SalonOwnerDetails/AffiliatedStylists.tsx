import { useGetSpecialistsQuery } from '@/redux/api/specialistsApi';
import { Avatar } from 'antd';
import React from 'react'

export default function AffiliatedStylists({ id }: any) {
    const { data } = useGetSpecialistsQuery(id, { skip: !id });

    console.log(data?.data, id)
    return (
        <div className="mt-6">
            <h4 className="font-medium mb-4">Affiliated Stylists</h4>
            <div className="flex flex-wrap gap-6">
                {data?.data?.map((stylist: any, index: number) => (
                    <div
                        key={index}
                        className="text-center cursor-pointer"

                    >
                        <Avatar size={50} src={stylist?.image} className="mb-2" />
                        <div className="text-xs font-medium">{stylist?.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
