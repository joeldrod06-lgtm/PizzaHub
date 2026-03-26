export function getAdminErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Ocurrió un error al guardar los cambios.";
}
