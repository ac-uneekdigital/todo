import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
//Components
import Todos from "./components/Todos";
import TodoLists from "./components/TodoLists";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user.user_metadata;
  const authUser = data.session?.user

  if (data.session) {

    return (
      <>
        <main>
          <Todos authUser={authUser} user={user} />
        </main>
      </>
    )
  }
  else {
    redirect("/login");
  }

}
