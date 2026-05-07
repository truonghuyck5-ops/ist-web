import { ProductCard } from '../components/ProductCard'
import { SectionTitle } from '../components/SectionTitle'
import { products } from '../data/products'

export function Products() {
  return `    

    <section id="products" class="border-t border-gray-900 fade-in">

        <div class="max-w-7xl mx-auto px-6 py-24">

            ${SectionTitle({
                label: 'SẢN PHẨM & DỊCH VỤ',
                title: 'Các sản phẩm<br>chủ lực của IST'
            })}

            <div class="grid md:grid-cols-3 gap-6">

            ${products
                .map((product) =>
                    ProductCard(product)
                )
                .join('')}

            </div>

        </div>

    </section>
     `
}
        