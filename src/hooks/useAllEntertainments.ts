import useEntertainment from './useEntertainment';
import usePlaces from './usePlaces';

export default function useAllEntertainments(eventId: string) {
    const {
        data: placeData,
        isLoading: placeIsLoading,
        error: placeError,
    } = usePlaces(eventId!.toString());

    const events =
        placeData?.map((place) => ({
            hook: useEntertainment(eventId, place.id),
            place: place,
        })) || [];

    let data = [];
    for (const event of events) {
        if (event.hook.data) {
            for (const floor of event.hook.data) {
                for (const entertainment of floor.events) {
                    data.push({
                        building: event.place,
                        floor: floor,
                        ...entertainment,
                    });
                }
            }
        }
    }
    data = data
        .filter((d) => !!d)
        .sort((a, b) => a.date.start.seconds - b.date.start.seconds);
    const isLoading =
        events.some((event) => event.hook.isLoading) || placeIsLoading;
    const error = events.some((event) => event.hook.error) || placeError;

    return { data, isLoading, error };
}
