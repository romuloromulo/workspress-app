// const triggerToast = (title, description, variant) => {
//     toast({ title, description, variant })
// }

// const triggerDispatch = (type, payload) => {
//     dispatch({ type, payload })
// }

// const deleteFolder = async (folderId, user, workspaceId) => {
//     const deletionMessage = `Pasta deletada por ${user.email}`
//     // Attempting to delete
//     const { data, error } = await updateFolder({ inTrash: deletionMessage }, folderId)
//     // In case of error
//     if (error) return triggerToast(String(error), 'Pasta não pode ser movida para a lixeira', 'destructive')
//     // In case of success
//     const dispatchPayload = {
//         folder: { inTrash: deletionMessage },
//         folderId,
//         workspaceId,
//     }
//     triggerDispatch('UPDATE_FOLDER', dispatchPayload)
//     triggerToast('Sucesso', 'Pasta movida para lixeira')
// }

// const deleteFile = async (folderId, fileId, user, workspaceId) => {
//     const deletionMessage = `Arquivo deletado por ${user.email}`
//     // Attempting to delete
//     const { data, error } = await updateFile({ inTrash: deletionMessage }, fileId)
//     // In case of error
//     if (error) return triggerToast(String(error), 'Arquivo não pode ser movido para a lixeira', 'destructive')
//     // In case of success
//     const dispatchPayload = {
//         file: { inTrash: deletionMessage },
//         fileId,
//         folderId,
//         workspaceId,
//     }
//     triggerDispatch('UPDATE_FILE' ,dispatchPayload)
//     triggerToast('Sucesso', 'Arquivo movido para lixeira')
// }

// async function moveToTrash(user, workspaceId, listType, entryId) {
//     if (!user?.email || !workspaceId || !listType || !pathId) return
//     setIsDeleting(true)
//     const entryIdParts = entryId.split('folder')
//     if (listType === 'folder') await deleteFolder(entryIdParts[0], user, workspaceId)
//     else if (listType === 'file') await deleteFile(entryIdParts[0], entryIdParts[1], user, workspaceId)
//     setIsDeleting(false)
// }
