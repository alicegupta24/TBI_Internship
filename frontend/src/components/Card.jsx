function Card({ title, description }) {
return ( <div className="border rounded-lg p-4 shadow-md"> <h3 className="text-2xl font-bold">{title}</h3> <p className="mt-2">{description}</p> </div>
)
}

export default Card
