import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";

const SAY_HELLO = gql`
  query SayHello {
    sayHello
  }
`

const Client: NextPage = () => {
  const {data} = useQuery(SAY_HELLO)

  return (
    <main>
      {JSON.stringify(data)}
    </main>
  ) 
}

export default Client
