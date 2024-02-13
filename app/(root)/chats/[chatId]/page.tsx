import getChatsById from '@/app/actions/getChatsById'
import getMessages from '@/app/actions/getMessages'

import Header from '@/components/custom/chats/[chatId]/components/Header'
import Body from '@/components/custom/chats/[chatId]/components/Body'
import Form from '@/components/custom/chats/[chatId]/components/Form'
import EmptyState from '@/components/custom/EmptyState'

interface IParams {
    chatId: string
}

const ChatId = async ({ params }: { params: IParams }) => {
    const chat = await getChatsById(params.chatId)
    const messages = await getMessages(params.chatId)

    if (!chat) {
        return (
            <div className="h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <div className="h-full flex flex-col">
                <Header chat={chat} />
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    )
}

export default ChatId
