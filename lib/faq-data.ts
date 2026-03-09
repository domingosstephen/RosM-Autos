import type { FAQCategory } from '@/types/faq'

export const faqCategories: FAQCategory[] = [
  {
    id: 'buying-process',
    title: 'Buying Process',
    items: [
      {
        question: 'How do I place an order for a vehicle or equipment from RosM Autos?',
        answer:
          'You can place an order directly through our website by browsing our inventory and submitting an enquiry form, or by contacting our sales team via email or WhatsApp. Once you select a vehicle, we will send you a detailed proforma invoice with pricing, specifications, and shipping options. After confirming your order and making the required deposit, we begin preparing your vehicle for export.',
      },
      {
        question: 'Can I request a specific make, model, or specification that is not currently listed?',
        answer:
          'Absolutely. RosM Autos offers a custom sourcing service where our procurement team searches auctions, dealer networks, and private sellers across Europe and Asia to find the exact vehicle or equipment you need. Simply provide us with your desired specifications, budget range, and timeline, and we will present matching options within 5 to 10 business days.',
      },
      {
        question: 'Is it possible to purchase vehicles in bulk for commercial or fleet purposes?',
        answer:
          'Yes, we regularly handle bulk and fleet orders for dealerships, transport companies, NGOs, and agricultural cooperatives. Bulk buyers benefit from volume-based pricing discounts, consolidated shipping arrangements, and a dedicated account manager. Contact our commercial sales desk to discuss quantities, delivery schedules, and tailored pricing.',
      },
      {
        question: 'How do I know if a vehicle is still available after I see it listed?',
        answer:
          'Our online inventory is updated frequently, but due to high demand certain vehicles may sell quickly. We recommend submitting an enquiry or contacting us as soon as you find a listing you are interested in so we can confirm real-time availability. Once you place a deposit, the vehicle is reserved exclusively for you.',
      },
      {
        question: 'Can I visit your facility to inspect vehicles before purchasing?',
        answer:
          'You are welcome to schedule an in-person visit to our facility to inspect any vehicles or equipment before committing to a purchase. If an in-person visit is not feasible, we provide comprehensive photo galleries, detailed video walk-arounds, and live video calls so you can inspect the vehicle remotely. Many of our international clients rely on our remote inspection process with confidence.',
      },
      {
        question: 'How long does the entire buying process take from order to delivery?',
        answer:
          'The typical timeline from confirmed order to delivery ranges from 3 to 8 weeks depending on your destination, shipping method, and whether any custom sourcing is required. Once payment is confirmed, vehicle preparation and documentation usually take 3 to 5 business days, followed by transit times that vary by destination. We keep you informed at every stage with regular status updates.',
      },
      {
        question: 'Do you offer any after-sale support or assistance once I receive my vehicle?',
        answer:
          'Yes, our relationship does not end at delivery. We provide after-sale support including guidance on local registration procedures, recommendations for trusted mechanics in your region, and assistance sourcing spare parts. Our customer support team is available via email and WhatsApp to help resolve any post-delivery questions or concerns.',
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment & Pricing',
    items: [
      {
        question: 'What payment methods does RosM Autos accept?',
        answer:
          'We accept international bank wire transfers (SWIFT/TT), which is the most common method for overseas transactions. We also accept payments through Western Union, MoneyGram, and select mobile money platforms for certain regions. All payment instructions are provided on your official proforma invoice to ensure a secure and traceable transaction.',
      },
      {
        question: 'What currencies can I pay in?',
        answer:
          'Our prices and invoicing are in Euros (EUR), which is widely accepted for international trade. If you prefer to pay in another currency, please contact our finance team and we will do our best to accommodate your request. Exchange rates are calculated at the time of payment based on prevailing market rates.',
      },
      {
        question: 'Is a deposit required, and how much is it?',
        answer:
          'Yes, we require a deposit to reserve your vehicle and begin the export preparation process. The standard deposit is typically 30% of the total invoice amount, with the remaining balance due before shipment. For custom-sourced vehicles, a higher initial deposit may be required to secure the purchase on your behalf.',
      },
      {
        question: 'How do you ensure the security of my payment?',
        answer:
          'All transactions are conducted through verified and traceable banking channels, and every payment is accompanied by an official receipt from RosM Autos. We never request payment to personal accounts or through unofficial channels. Our company banking details are printed on your proforma invoice, and we encourage you to verify them directly with our team before transferring funds.',
      },
      {
        question: 'Are your listed prices final, or are there additional costs?',
        answer:
          'Our listed prices typically reflect the FOB (Free on Board) cost, which includes the vehicle price and loading at the port of departure. Shipping freight, marine insurance, destination port charges, import duties, and local taxes are additional costs that vary by destination. We provide a full cost breakdown on your proforma invoice so there are no surprises.',
      },
      {
        question: 'Do you offer installment or financing plans?',
        answer:
          'At this time, RosM Autos operates primarily on a prepayment basis and does not offer direct financing. However, we can work with third-party trade finance providers and can supply any documentation your bank or lender may require to arrange financing on your end. We are happy to discuss flexible payment schedules on a case-by-case basis for large or repeat orders.',
      },
      {
        question: 'Can I get a refund if I change my mind after paying?',
        answer:
          'Refund eligibility depends on the stage of your order. If the vehicle has not yet been shipped or prepared for export, a partial refund minus administrative fees may be possible. Once a vehicle has been loaded for shipping, refunds are generally not available as logistics costs have already been incurred. We recommend reviewing our full refund policy before placing your deposit.',
      },
    ],
  },
  {
    id: 'condition',
    title: 'Vehicle & Equipment Condition',
    items: [
      {
        question: 'How does RosM Autos inspect vehicles before listing them for sale?',
        answer:
          'Every vehicle undergoes a rigorous multi-point inspection conducted by our certified mechanics and technicians before it is listed in our inventory. We evaluate the engine, transmission, brakes, suspension, electrical systems, bodywork, and interior condition. Any identified issues are documented and disclosed transparently in the vehicle listing so buyers can make fully informed decisions.',
      },
      {
        question: 'What grading or rating system do you use for vehicle condition?',
        answer:
          'We use a clear condition grading scale that ranges from Grade A (excellent condition with minimal wear) through Grade B (good condition with normal wear for age and mileage) to Grade C (fair condition, may require some repairs or cosmetic attention). Each listing includes its grade along with detailed photos and a written condition report so you know exactly what to expect.',
      },
      {
        question: 'Are the mileage and hour readings on your vehicles verified and accurate?',
        answer:
          'Yes, we take odometer and hour-meter accuracy very seriously. Where available, we obtain official vehicle history reports and cross-reference mileage with service records and previous inspection data. If there is any discrepancy or if mileage cannot be independently verified, we clearly disclose this in the listing description.',
      },
      {
        question: 'Do you sell vehicles with known mechanical issues?',
        answer:
          'We believe in full transparency. If a vehicle has known mechanical issues, these are clearly stated in the listing description and reflected in the pricing. Some buyers prefer to purchase lower-grade vehicles at a reduced price and handle repairs locally. We always recommend reviewing the full condition report and discussing any concerns with our sales team before purchasing.',
      },
      {
        question: 'Can I request an independent third-party inspection before buying?',
        answer:
          'Yes, you are welcome to arrange an independent third-party inspection at your own expense before finalizing your purchase. We will facilitate access to the vehicle for the inspector at our facility during business hours. This is a common practice among our international buyers and we fully support it as part of our commitment to transparency.',
      },
      {
        question: 'What is the typical age and mileage range of your used vehicles?',
        answer:
          'Our inventory includes a wide range of vehicles typically between 3 and 15 years old with mileage ranging from 30,000 to 250,000 kilometres depending on the vehicle type. Tractors and heavy equipment are measured in engine hours rather than kilometres. We carefully select vehicles that still have significant remaining useful life and offer strong value for money.',
      },
      {
        question: 'Do you perform any reconditioning or repairs before shipping?',
        answer:
          'We offer optional reconditioning services including mechanical servicing, oil and filter changes, brake replacement, paint touch-ups, and interior cleaning. These services can be added to your order for an additional fee and are performed before shipping. If you prefer to receive the vehicle as-is to save costs, that option is always available.',
      },
      {
        question: 'Are accident history and previous ownership details available?',
        answer:
          'Wherever possible, we provide vehicle history information including accident records and ownership history sourced from official databases and documentation. For vehicles imported from Japan, we typically have auction sheets with detailed history. We disclose all available history information and clearly note when complete records are unavailable.',
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    items: [
      {
        question: 'What shipping methods are available for international delivery?',
        answer:
          'We offer two primary shipping methods: RoRo (Roll-on/Roll-off), where your vehicle is driven onto the cargo ship and secured on deck, and container shipping, where your vehicle is loaded into a 20ft or 40ft container. RoRo is generally more affordable for single vehicles, while container shipping offers greater protection and allows you to include spare parts or additional cargo alongside your vehicle.',
      },
      {
        question: 'How long does shipping take to my destination?',
        answer:
          'Transit times vary depending on your destination and the shipping method chosen. Typical transit times range from 2 to 4 weeks for East African destinations, 3 to 5 weeks for West Africa, and 4 to 6 weeks for destinations in the Caribbean, Pacific Islands, or South America. We provide estimated arrival dates at the time of booking and update you with vessel tracking information once the shipment departs.',
      },
      {
        question: 'Can I track my shipment while it is in transit?',
        answer:
          'Yes, once your vehicle is loaded and the vessel departs, we provide you with the bill of lading number and vessel name so you can track the shipment in real time using online vessel tracking tools. We also send you periodic updates via email or WhatsApp at key milestones including departure, any transshipment points, and estimated arrival at your destination port.',
      },
      {
        question: 'Is marine insurance included in the shipping cost?',
        answer:
          'Marine insurance is not included by default but is strongly recommended and can be arranged through our trusted insurance partners at competitive rates. Marine insurance typically covers total loss, partial damage, and theft during transit. We advise all buyers to opt for insurance, as it provides peace of mind for a relatively small additional cost compared to the value of your vehicle.',
      },
      {
        question: 'What happens if my vehicle is damaged during shipping?',
        answer:
          'In the unlikely event of shipping damage, the process depends on whether you have marine insurance coverage. If insured, you would file a claim with the insurance provider, and we assist you with all required documentation and photographic evidence. We recommend photographing and inspecting your vehicle thoroughly at the destination port upon arrival and reporting any damage within the timeframe specified by your insurance policy.',
      },
      {
        question: 'Can I ship multiple vehicles or combine vehicles with other cargo?',
        answer:
          'Yes, container shipping allows you to combine multiple vehicles or include additional items such as spare parts, tyres, tools, and agricultural implements within the same container. We can fit two to three standard sedans in a 40ft container, or one vehicle along with significant additional cargo. Our logistics team will advise on the best configuration to maximise space and minimise your per-unit shipping cost.',
      },
      {
        question: 'Which ports do you ship from, and which destinations do you serve?',
        answer:
          'We ship from major European ports including Antwerp, Rotterdam, Bremerhaven, and select UK ports, as well as from Japanese ports for Japan-sourced vehicles. We serve destinations across Africa, the Middle East, the Caribbean, Central and South America, Southeast Asia, and the Pacific Islands. If your destination port is not commonly served, we will work with our shipping partners to find the best available route.',
      },
      {
        question: 'Do you handle inland delivery from the destination port to my location?',
        answer:
          'Our standard service covers port-to-port delivery, but we can arrange door-to-door delivery including inland transportation from the destination port to your specified address through our local logistics partners. Inland delivery costs vary by destination and distance and will be quoted separately. Many of our clients prefer to arrange local pickup themselves to reduce costs.',
      },
    ],
  },
  {
    id: 'customs',
    title: 'Customs & Documentation',
    items: [
      {
        question: 'What export documents does RosM Autos provide with each vehicle?',
        answer:
          'We provide a comprehensive documentation package including the original or certified copy of the vehicle title, a commercial invoice, a bill of lading, an export certificate, and a packing list. For vehicles sourced from Japan, we also include the export certificate and de-registration documents. All documents are prepared in accordance with international trade standards to ensure smooth customs clearance at your destination.',
      },
      {
        question: 'Will I need to pay import duties and taxes when my vehicle arrives?',
        answer:
          'Yes, most countries impose import duties, excise taxes, and VAT or sales tax on imported vehicles, and these costs are the responsibility of the buyer. Duty rates vary significantly by country, vehicle age, engine size, and vehicle type. We recommend consulting with a local customs broker or clearing agent in your country to get an accurate estimate of the total landed cost before placing your order.',
      },
      {
        question: 'Do you assist with customs clearance at the destination port?',
        answer:
          'While customs clearance is ultimately the buyer\'s responsibility, we provide all necessary export documentation to facilitate a smooth process. We can also recommend trusted customs brokers and clearing agents in many destination countries who are familiar with our documentation format. For buyers who need additional assistance, we offer a guided clearance support service where our team walks you through the process step by step.',
      },
      {
        question: 'Are there age restrictions on importing used vehicles to my country?',
        answer:
          'Many countries impose age restrictions on used vehicle imports, typically ranging from 3 to 8 years maximum age from the date of manufacture. Some countries ban the import of vehicles older than a certain threshold entirely, while others apply higher duty rates to older vehicles. We maintain an up-to-date reference guide for major destination countries and will advise you on eligibility before you purchase.',
      },
      {
        question: 'Do I need a pre-shipment inspection certificate?',
        answer:
          'Several countries, particularly in Africa, require a pre-shipment inspection (PSI) certificate such as those issued by SGS, COTECNA, or Bureau Veritas before a vehicle can be imported. We coordinate the inspection process at the port of departure and ensure that your vehicle passes all required checks. The cost of the PSI certificate is typically borne by the buyer and will be included in your cost breakdown.',
      },
      {
        question: 'Can you provide a certificate of conformity or roadworthiness for my country?',
        answer:
          'We can provide the vehicle\'s original technical specifications, emission data, and any European roadworthiness certificates where available. However, destination-country-specific certificates of conformity or roadworthiness must typically be obtained locally after the vehicle arrives and is inspected by your national transport authority. We will supply all the technical documentation needed to support your local registration and compliance process.',
      },
      {
        question: 'What happens if my shipment is held at customs?',
        answer:
          'Customs holds can occur for various reasons including incomplete documentation, random inspections, or discrepancies in declared values. If your shipment is held, contact our support team immediately and we will work with you and your clearing agent to resolve the issue as quickly as possible. Having accurate and complete documentation, which we ensure on our end, significantly reduces the likelihood of customs delays.',
      },
      {
        question: 'Do you handle temporary import or re-export documentation for transit countries?',
        answer:
          'Yes, if your vehicle needs to transit through an intermediate country before reaching its final destination, we can assist with temporary import permits and transit documentation. This is common for landlocked countries where vehicles arrive at a neighbouring coastal port. Our logistics partners in key transit countries are experienced in handling these procedures efficiently to avoid unnecessary storage charges.',
      },
    ],
  },
  {
    id: 'tractors',
    title: 'Farm Tractors',
    items: [
      {
        question: 'What brands and models of used farm tractors does RosM Autos offer?',
        answer:
          'We stock a wide selection of used farm tractors from leading global brands including John Deere, Massey Ferguson, New Holland, Kubota, Case IH, Deutz-Fahr, and Fendt. Our inventory ranges from compact 25HP utility tractors suitable for smallholder farms to large 150HP+ models designed for commercial agricultural operations. We source tractors that are well-suited to the terrain and farming conditions in Africa, the Middle East, and other developing markets.',
      },
      {
        question: 'How are your used tractors graded, and what condition can I expect?',
        answer:
          'Our tractors are graded using the same A, B, and C system we apply to all vehicles, with additional attention to engine hours, hydraulic system condition, PTO functionality, and tyre wear. Grade A tractors typically have under 3,000 engine hours and are in excellent working condition, while Grade B units range from 3,000 to 6,000 hours with normal operational wear. Every tractor undergoes a mechanical inspection and a test run before being listed for sale.',
      },
      {
        question: 'Do your tractors come with implements or attachments?',
        answer:
          'Tractors are generally sold as standalone units, but we can source and supply a wide range of compatible implements including ploughs, harrows, planters, trailers, rotary tillers, and mowers. Purchasing implements together with your tractor allows us to ship everything in the same container, saving you significant freight costs. Let us know your farming requirements and we will recommend the best tractor-implement combination for your needs.',
      },
      {
        question: 'How many engine hours is considered acceptable for a used tractor?',
        answer:
          'Engine hours on a tractor are similar to mileage on a car and indicate how much the machine has been used. A well-maintained diesel tractor can reliably operate for 10,000 to 15,000 hours or more. We generally recommend tractors with under 5,000 hours for buyers seeking long remaining service life, though units with higher hours can still be excellent value if they have been properly maintained.',
      },
      {
        question: 'Are the PTO and hydraulic systems tested before sale?',
        answer:
          'Yes, the Power Take-Off (PTO) and hydraulic systems are critical components and are thoroughly tested during our inspection process. We verify PTO engagement and speed (typically 540 and 1000 RPM), hydraulic lift capacity, three-point hitch operation, and all auxiliary hydraulic outlets. Any issues found are documented in the condition report, and repairs can be performed upon request before shipping.',
      },
      {
        question: 'Are your tractors suitable for farming conditions in Africa?',
        answer:
          'Many of our tractors are specifically selected for their suitability to African farming conditions, including rugged terrain, high temperatures, and limited access to specialised service centres. We prioritise models known for durability, simple mechanical designs that are easy to maintain, and wide availability of spare parts in African markets. Our sales team can advise you on the best models for your specific region and crop type.',
      },
      {
        question: 'Can I get spare parts and service support for my tractor after purchase?',
        answer:
          'We maintain relationships with parts suppliers and can help you source genuine and aftermarket spare parts for most tractor brands in our inventory. We recommend ordering a starter kit of common wear parts such as filters, belts, and brake components to ship alongside your tractor. For ongoing parts needs, we can arrange periodic shipments or connect you with local dealers and parts distributors in your region.',
      },
      {
        question: 'Do you offer four-wheel-drive tractors for difficult terrain?',
        answer:
          'Yes, we carry both two-wheel-drive (2WD) and four-wheel-drive (4WD) tractors to suit different farming conditions. 4WD tractors are highly recommended for hilly terrain, muddy or wet fields, and heavy-duty operations like land clearing or deep ploughing. While 4WD models tend to be priced higher, they provide significantly better traction and versatility, making them a worthwhile investment for challenging agricultural environments.',
      },
    ],
  },
  {
    id: 'electric-bikes',
    title: 'Electric Bikes',
    items: [
      {
        question: 'What types of electric bikes does RosM Autos sell?',
        answer:
          'We offer a diverse range of used electric bikes including city commuter e-bikes, folding e-bikes for easy storage and transport, electric mountain bikes (e-MTBs) for off-road use, and cargo e-bikes for commercial deliveries. Our inventory features well-known European and Asian brands such as Bosch-powered systems, Shimano STEPS, Gazelle, Cube, and Giant. Each e-bike is inspected and tested before listing to ensure it is ready to ride.',
      },
      {
        question: 'What is the typical battery condition on your used electric bikes?',
        answer:
          'Battery health is one of the most important factors in a used e-bike, and we test every battery to determine its remaining capacity as a percentage of its original specification. Most of our e-bikes retain 70% to 90% of their original battery capacity, which still provides excellent range for daily use. We clearly state the battery health percentage and estimated remaining range in each listing so you can make an informed choice.',
      },
      {
        question: 'What motor types and power specifications are available?',
        answer:
          'Our e-bikes feature a variety of motor configurations including mid-drive motors (such as Bosch, Shimano, and Brose) and hub motors in both front and rear wheel positions. Motor power typically ranges from 250W (the EU standard) up to 750W for models designed for markets with higher power allowances. Mid-drive motors generally offer better hill-climbing performance and a more natural riding feel, while hub motors are simpler and more affordable to maintain.',
      },
      {
        question: 'How do I charge an electric bike, and what charger is included?',
        answer:
          'Every e-bike we sell comes with its original or a compatible replacement charger that plugs into a standard household electrical outlet. Charging times typically range from 3 to 6 hours for a full charge depending on battery capacity. We verify charger functionality during our inspection process, and if you need an additional or replacement charger, we can source one for most brands and battery types in our inventory.',
      },
      {
        question: 'What range can I expect from a used electric bike?',
        answer:
          'Range depends on battery capacity, battery health, rider weight, terrain, and the level of pedal assist used. Most of our e-bikes offer a practical range of 40 to 100 kilometres on a single charge under normal riding conditions. We provide an estimated range for each listing based on tested battery capacity. Using lower assist levels and pedalling actively can significantly extend your range beyond the stated estimates.',
      },
      {
        question: 'Do your electric bikes come with any warranty?',
        answer:
          'As these are used vehicles, the original manufacturer warranty has typically expired. However, RosM Autos offers a 30-day functional guarantee covering the motor and battery on all e-bikes graded A or B, ensuring they perform as described in the listing. We also provide a detailed condition report that serves as your baseline reference. For extended coverage, we can recommend third-party warranty providers in select markets.',
      },
      {
        question: 'Can electric bikes be shipped internationally like vehicles?',
        answer:
          'Yes, electric bikes can be shipped internationally, and their compact size makes shipping very cost-effective. Multiple e-bikes can be packed into a single container alongside vehicles or other equipment, dramatically reducing per-unit freight costs. We handle all packaging, securing, and export documentation for e-bikes just as we do for vehicles. Lithium battery shipping regulations are followed to ensure compliance with international transport safety standards.',
      },
      {
        question: 'Are replacement batteries available if I need a new one in the future?',
        answer:
          'Replacement batteries are available for most major e-bike brands and motor systems, and we can help you source both original and compatible aftermarket batteries. Battery prices vary depending on capacity and brand, typically ranging from 300 to 800 EUR for quality replacements. We recommend planning for a battery replacement after 3 to 5 years of regular use, as lithium-ion batteries naturally degrade over time with charge cycles.',
      },
    ],
  },
]

export const allFaqItems = faqCategories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryId: category.id,
    categoryTitle: category.title,
  }))
)
