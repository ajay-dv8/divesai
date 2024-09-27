import { Plus } from "lucide-react"
import { TabsMenu } from "../tabs"
import { TabsContent } from "../ui/tabs"
import { DataTable } from "../table"
import { TableCell, TableRow } from "../ui/table"
import Image from "next/image"
import { getMonthName } from "@/constants/timeslots"
import { SideSheet } from "../sheet"
import { CreateProductForm } from "./product-form"


type ProductTableProps = {
  products: {
    id: string
    name: string
    price: number
    image: string
    createdAt: Date
    domainId: string | null
  }[]
  id: string
}

export const ProductTable = ({ id, products }: ProductTableProps) => {
  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl ">Products Store</h2>
        <p className="text-sm font-light mt-2 mb-5">
          You can Add, edit, or delete products you want to advertise to this store
        </p>
      </div>

      {/* give user the ability to tab between contents */}
      <TabsMenu
        className="w-full flex justify-start"
        triggers={[
          {
            label: 'All products',
          },
          // we can add states for products
          { label: 'Live' },
          { label: 'Deactivated' },
        ]}
        button={
          <div className="flex-1 flex justify-end">
            {/* TODO: remove payment */}
            <SideSheet
              description="Add products to your store and set them live to accept payments from
          customers."
              title="Add a product"
              className="flex items-center gap-2 bg-green px-4 py-2 font-semibold rounded-lg text-sm"
              trigger={
                <>
                  <Plus
                    size={20}
                    className="text-white"
                  />
                  <p className="text-white">Add Product</p>
                </>
              }
            >
              <CreateProductForm id={id} />
            </SideSheet>
          </div>
        }
      >
        <TabsContent value="All products"> 
          <DataTable headers={['Featured Image', 'Name', 'Pricing', 'Created']}>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={`https://ucarecdn.com/${product.image}/`}
                    width={50}
                    height={50}
                    alt="image"
                  />
                </TableCell>
                <TableCell>${product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="text-right">
                  {product.createdAt.getDate()}{' '}
                  {getMonthName(product.createdAt.getMonth())}{' '}
                  {product.createdAt.getFullYear()}
                </TableCell>
              </TableRow>
            ))}
          </DataTable>
        </TabsContent>
      </TabsMenu>
    </div>
  )
}
