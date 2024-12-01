import { z } from "zod";

/**
 * @see {@link https://github.com/colinhacks/zod/issues/2623 `z.record` with a key of a union or enum schema results in a partial record}
 */
export const record = <
  PropertySchema extends z.ZodEnum<[string, ...string[]]>,
  ValueSchema extends z.ZodTypeAny,
>(
  propertySchema: PropertySchema,
  valueSchema: ValueSchema,
) =>
  z.object(
    Object.fromEntries(
      propertySchema.options.map((property) => [property, valueSchema]),
    ) as {
      [Property in z.infer<PropertySchema>]: ValueSchema;
    },
  );
