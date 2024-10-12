export interface SagaStep<T, R> {
  start(dto: T): Promise<R>;
  cancel(): Promise<void>;
}
