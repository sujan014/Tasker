export const createResponse = <T>({
  data,
  code,
  message,
  isSuccess,
}: {
  data: T;
  code: number;
  message: string;
  isSuccess: boolean;
}) => {
  return new Response(
    JSON.stringify({
      data,
      code,
      message,
      isSuccess,
    }),
    {
      status: code,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
