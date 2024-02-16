// import getConversations from "../actions/getConversations";
// import getUsers from "../actions/getUsers";
// import Sidebar from "../components/sidebar/Sidebar";
// import ConversationList from "./components/ConversationList";
import getChats from '@/lib/actions/getChats'
import getUsers from '@/lib/actions/getUsers'
import ChatList from '@/components/custom/chats/components/ChatList'
import Sidebar from '@/components/custom/sidebar/Sidebar'
// import { getAllUsers } from '@/lib/actions/user.actions'

export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const chats = await getChats()
    const users = await getUsers()

    return (
        <Sidebar>
            <div className="h-full flex justify-center">
                <ChatList
                    users={users!}
                    title="Messages"
                    initialItems={chats}
                />
                {children}
            </div>
        </Sidebar>
    )
}
