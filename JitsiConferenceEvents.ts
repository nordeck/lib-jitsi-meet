/**
 * The events for the conference.
 */
export enum JitsiConferenceEvents {

    /**
     * Event indicates that the current conference audio input switched between audio
     * input states,i.e. with or without audio input.
     */
    AUDIO_INPUT_STATE_CHANGE = 'conference.audio_input_state_changed',

    /**
     * Event indicates that the permission for unmuting audio has changed based on the number of audio senders in the
     * call and the audio sender limit configured in Jicofo.
     */
    AUDIO_UNMUTE_PERMISSIONS_CHANGED = 'conference.audio_unmute_permissions_changed',

    /**
     * Indicates that authentication status changed.
     */
    AUTH_STATUS_CHANGED = 'conference.auth_status_changed',

    /**
     * The local participant was approved to be able to unmute.
     * @param {options} event - {
     *     {MediaType} mediaType
     * }.
     */
    AV_MODERATION_APPROVED = 'conference.av_moderation.approved',

    /**
     * AV Moderation was enabled/disabled. The actor is the participant that is currently in the meeting,
     * or undefined if that participant has left the meeting.
     *
     * @param {options} event - {
     *     {boolean} enabled,
     *     {MediaType} mediaType,
     *     {JitsiParticipant} actor
     * }.
     */
    AV_MODERATION_CHANGED = 'conference.av_moderation.changed',

    /**
     * AV Moderation, report for user being approved to unmute.
     * @param {options} event - {
     *     {JitsiParticipant} participant,
     *     {MediaType} mediaType
     * }.
     */
    AV_MODERATION_PARTICIPANT_APPROVED = 'conference.av_moderation.participant.approved',

    /**
     * AV Moderation, report for user being blocked to unmute.
     * @param {options} event - {
     *     {JitsiParticipant} participant,
     *     {MediaType} mediaType
     * }.
     */
    AV_MODERATION_PARTICIPANT_REJECTED = 'conference.av_moderation.participant.rejected',

    /**
     * The local participant was blocked to be able to unmute.
     * @param {options} event - {
     *     {MediaType} mediaType
     * }.
     */
    AV_MODERATION_REJECTED = 'conference.av_moderation.rejected',

    /**
     * Fired just before the statistics module is disposed and it's the last chance
     * to submit some logs to the statistics service before it's disconnected.
     */
    BEFORE_STATISTICS_DISPOSED = 'conference.beforeStatisticsDisposed',

    /**
     * Event indicates that the bot participant type changed.
     */
    BOT_TYPE_CHANGED = 'conference.bot_type_changed',

    /**
     * Event fired when a participant is requested to join a given (breakout) room.
     */
    BREAKOUT_ROOMS_MOVE_TO_ROOM = 'conference.breakout-rooms.move-to-room',

    /**
     * Event fired when the breakout rooms data was updated.
     */
    BREAKOUT_ROOMS_UPDATED = 'conference.breakout-rooms.updated',

    /**
     * Event fired when the bandwidth estimation stats are received from the bridge.
     */
    BRIDGE_BWE_STATS_RECEIVED = 'conference.bridgeBweStatsReceived',

    /**
     * UTC conference timestamp when first participant joined.
     */
    CONFERENCE_CREATED_TIMESTAMP = 'conference.createdTimestamp',

    /**
     * Indicates that an error occurred.
     */
    CONFERENCE_ERROR = 'conference.error',

    /**
     * Indicates that conference failed.
     */
    CONFERENCE_FAILED = 'conference.failed',

    /**
     * Indicates that conference has been joined. The event does NOT provide any
     * parameters to its listeners.
     */
    CONFERENCE_JOINED = 'conference.joined',

    /**
     * Indicates that conference is in progress of joining.
     */
    CONFERENCE_JOIN_IN_PROGRESS = 'conference.join_in_progress',

    /**
     * Indicates that conference has been left.
     */
    CONFERENCE_LEFT = 'conference.left',

    /**
     * Indicates that the conference unique identifier has been set.
     */
    CONFERENCE_UNIQUE_ID_SET = 'conference.unique_id_set',

    /**
     * Indicates that the aggregate set of codecs supported by the visitors has changed.
     */
    CONFERENCE_VISITOR_CODECS_CHANGED = 'conference.visitor_codecs_changed',

    /**
     * Indicates that the connection to the conference has been established
     * XXX This is currently fired when the *ICE* connection enters 'connected'
     * state for the first time.
     */
    CONNECTION_ESTABLISHED = 'conference.connectionEstablished',

    /**
     * Indicates that the connection to the conference has been interrupted for some
     * reason.
     * XXX This is currently fired when the *ICE* connection is interrupted.
     */
    CONNECTION_INTERRUPTED = 'conference.connectionInterrupted',

    /**
     * Indicates that the connection to the conference has been restored.
     * XXX This is currently fired when the *ICE* connection is restored.
     */
    CONNECTION_RESTORED = 'conference.connectionRestored',

    /**
     * A connection to the video bridge's data channel has been closed.
     * This event is only emitted in
     */
    DATA_CHANNEL_CLOSED = 'conference.dataChannelClosed',

    /**
     * A connection to the video bridge's data channel has been established.
     */
    DATA_CHANNEL_OPENED = 'conference.dataChannelOpened',

    /**
     * A user has changed it display name
     */
    DISPLAY_NAME_CHANGED = 'conference.displayNameChanged',

    /**
     * The dominant speaker was changed.
     */
    DOMINANT_SPEAKER_CHANGED = 'conference.dominantSpeaker',

    /**
     * Indicates that DTMF support changed.
     */
    DTMF_SUPPORT_CHANGED = 'conference.dtmfSupportChanged',

    E2EE_VERIFICATION_AVAILABLE = 'conference.e2ee.verification.available',

    E2EE_VERIFICATION_COMPLETED = 'conference.e2ee.verification.completed',

    E2EE_VERIFICATION_READY = 'conference.e2ee.verification.ready',

    /**
     * Indicates that the encode time stats for the local video sources has been received.
     */
    ENCODE_TIME_STATS_RECEIVED = 'conference.encode_time_stats_received',

    /**
     * Indicates that a message from another participant is received on data
     * channel.
     */
    ENDPOINT_MESSAGE_RECEIVED = 'conference.endpoint_message_received',

    /**
     * Indicates that a message for the remote endpoint statistics has been received on the bridge channel.
     */
    ENDPOINT_STATS_RECEIVED = 'conference.endpoint_stats_received',

    /**
     * Event emitted when a list file is received in the conference. This event is fired when a participant joins
     * and the file list is sent to them.
     * @param {Map<String, IFileMetadata>} files - The map of files received in the conference with key the file ID.
     */
    FILE_SHARING_FILES_RECEIVED = 'conference.file_sharing.files_received',

    /**
     * Event emitted when a file is added to the conference.
     * @param {IFileMetadata} file - The file object containing metadata about the file.
     */
    FILE_SHARING_FILE_ADDED = 'conference.file_sharing.file_added',

    /**
     * Event emitted when a file is removed from the conference.
     * @param {String} fileId - The ID of the file that was removed.
     */
    FILE_SHARING_FILE_REMOVED = 'conference.file_sharing.file_removed',

    /**
     * The forwarded sources set is changed.
     *
     * @param {Array<string>} leavingForwardedSources the sourceNames of all the tracks which are leaving forwarded
     * sources
     * @param {Array<string>} enteringForwardedSources the sourceNames of all the tracks which are entering forwarded
     * sources
     */
    FORWARDED_SOURCES_CHANGED = 'conference.forwardedSourcesChanged',

    /**
     * NOTE This is lib-jitsi-meet internal event and can be removed at any time !
     *
     * Event emitted when conference transits, between one to one and multiparty JVB
     * conference. If the conference switches to P2P it's neither one to one nor
     * a multiparty JVB conference, but P2P (the status argument of this event will
     * be <tt>false</tt>).
     *
     * The first argument is a boolean which carries the previous value and
     * the seconds argument is a boolean with the new status. The event is emitted
     * only if the previous and the new values are different.
     *
     * @type {string}
     */
    JVB121_STATUS = 'conference.jvb121Status',

    /**
     * You are kicked from the conference.
     * @param {JitsiParticipant} the participant that initiated the kick.
     */
    KICKED = 'conference.kicked',

    /**
     * The Last N set is changed.
     *
     * @param {Array<string>|null} leavingEndpointIds the ids of all the endpoints
     * which are leaving Last N
     * @param {Array<string>|null} enteringEndpointIds the ids of all the endpoints
     * which are entering Last N
     */
    LAST_N_ENDPOINTS_CHANGED = 'conference.lastNEndpointsChanged',

    /**
     * A new user joined the lobby room.
     */
    LOBBY_USER_JOINED = 'conference.lobby.userJoined',

    /**
     * A user left the lobby room.
     */
    LOBBY_USER_LEFT = 'conference.lobby.userLeft',

    /**
     * A user from the lobby room has been update.
     */
    LOBBY_USER_UPDATED = 'conference.lobby.userUpdated',

    /**
     * Indicates that the room has been locked or unlocked.
     */
    LOCK_STATE_CHANGED = 'conference.lock_state_changed',

    /**
     * Indicates that the conference had changed to members only enabled/disabled.
     * The first argument of this event is a <tt>boolean</tt> which when set to
     * <tt>true</tt> means that the conference is running in members only mode.
     * You may need to use Lobby if supported to ask for permissions to enter the conference.
     */
    MEMBERS_ONLY_CHANGED = 'conference.membersOnlyChanged',

    /**
     * New text message was received.
     */
    MESSAGE_RECEIVED = 'conference.messageReceived',

    /**
     * Event fired when the conference metadata is updated.
     */
    METADATA_UPDATED = 'conference.metadata.updated',

    /**
     * Event indicates that the current microphone used by the conference is noisy.
     */
    NOISY_MIC = 'conference.noisy_mic',

    /**
     * Indicates that a message from the local user or from the Prosody backend
     * was received on the data channel.
     */
    NON_PARTICIPANT_MESSAGE_RECEIVED = 'conference.non_participant_message_received',

    /**
     * Event indicates that the current selected input device has no signal
     */
    NO_AUDIO_INPUT = 'conference.no_audio_input',

    /**
     * Indicates that the conference has switched between JVB and P2P connections.
     * The first argument of this event is a <tt>boolean</tt> which when set to
     * <tt>true</tt> means that the conference is running on the P2P connection.
     */
    P2P_STATUS = 'conference.p2pStatus',

    /**
     * Indicates that the features of the participant has been changed.
     * TODO: there is a spelling mistake in this event name and associated constants
     */
    PARTCIPANT_FEATURES_CHANGED = 'conference.partcipant_features_changed',

    /**
     * Participant was kicked from the conference.
     * @param {JitsiParticipant} the participant that initiated the kick.
     * @param {JitsiParticipant} the participant that was kicked.
     */
    PARTICIPANT_KICKED = 'conference.participant_kicked',

    /**
     * Indicates that a value of a specific property of a specific participant
     * has changed.
     */
    PARTICIPANT_PROPERTY_CHANGED = 'conference.participant_property_changed',

    /**
     * Indicates the state of sources attached to a given remote participant has changed.
     */
    PARTICIPANT_SOURCE_UPDATED = 'conference.participant_source_updated',

    /**
     * Indicates that the permissions for the local participant were updated.
     */
    PERMISSIONS_RECEIVED = 'conference.permissions_received',

    /**
     * Indicates that phone number changed.
     */
    PHONE_NUMBER_CHANGED = 'conference.phoneNumberChanged',

    /**
     * New private text message was received.
     */
    PRIVATE_MESSAGE_RECEIVED = 'conference.privateMessageReceived',

    /**
     * The conference properties changed.
     * @type {string}
     */
    PROPERTIES_CHANGED = 'conference.propertiesChanged',

    /**
     * New reaction was received.
     */
    REACTION_RECEIVED = 'conference.reactionReceived',

    /**
     * Indicates that recording state changed.
     */
    RECORDER_STATE_CHANGED = 'conference.recorderStateChanged',

    /**
     * Indicates that the region of the media server (jitsi-videobridge) that we
     * are connected to changed (or was initially set).
     * @type {string} the region.
     */
    SERVER_REGION_CHANGED = 'conference.server_region_changed',

    /**
     * Indicates a user has joined without audio
     */
    SILENT_STATUS_CHANGED = 'conference.silentStatusChanged',

    /**
     * Indicates that start muted settings changed.
     */
    START_MUTED_POLICY_CHANGED = 'conference.start_muted_policy_changed',

    /**
     * Indicates that subject of the conference has changed.
     */
    SUBJECT_CHANGED = 'conference.subjectChanged',

    /**
     * Indicates that DTMF support changed.
     */
    SUSPEND_DETECTED = 'conference.suspendDetected',

    /**
     * Event indicates that local user is talking while he muted himself
     */
    TALK_WHILE_MUTED = 'conference.talk_while_muted',

    /**
     * A new media track was added to the conference. The event provides the
     * following parameters to its listeners:
     *
     * @param {JitsiTrack} track the added JitsiTrack
     */
    TRACK_ADDED = 'conference.trackAdded',

    /**
     * Audio levels of a media track ( attached to the conference) was changed.
     */
    TRACK_AUDIO_LEVEL_CHANGED = 'conference.audioLevelsChanged',

    /**
     * A media track ( attached to the conference) mute status was changed.
     * @param {JitsiParticipant|null} the participant that initiated the mute
     * if it is a remote mute.
     */
    TRACK_MUTE_CHANGED = 'conference.trackMuteChanged',

    /**
     * The media track was removed from the conference. The event provides the
     * following parameters to its listeners:
     *
     * @param {JitsiTrack} track the removed JitsiTrack
     */
    TRACK_REMOVED = 'conference.trackRemoved',

    /**
     * The source-add for unmuting of a media track was rejected by Jicofo.
     *
     */
    TRACK_UNMUTE_REJECTED = 'conference.trackUnmuteRejected',

    /**
     * Notifies for transcription status changes. The event provides the
     * following parameters to its listeners:
     *
     * @param {String} status - The new status.
     */
    TRANSCRIPTION_STATUS_CHANGED = 'conference.transcriptionStatusChanged',

    /**
     * A new user joined the conference.
     */
    USER_JOINED = 'conference.userJoined',

    /**
     * A user has left the conference.
     */
    USER_LEFT = 'conference.userLeft',

    /**
     * User role changed.
     */
    USER_ROLE_CHANGED = 'conference.roleChanged',

    /**
     * User status changed.
     */
    USER_STATUS_CHANGED = 'conference.statusChanged',

    /**
     * Indicates that the video codec of the local video track has changed.
     */
    VIDEO_CODEC_CHANGED = 'conference.videoCodecChanged',

    /**
     * Indicates that video SIP GW state changed.
     * @param {VideoSIPGWConstants} status.
     */
    VIDEO_SIP_GW_AVAILABILITY_CHANGED = 'conference.videoSIPGWAvailabilityChanged',

    /**
     * Indicates that video SIP GW Session state changed.
     * @param {options} event - {
     *     {string} address,
     *     {VideoSIPGWConstants} oldState,
     *     {VideoSIPGWConstants} newState,
     *     {string} displayName
     * }.
     */
    VIDEO_SIP_GW_SESSION_STATE_CHANGED = 'conference.videoSIPGWSessionStateChanged',

    /**
     * Event indicates that the permission for unmuting video has changed based on the number of video senders in the
     * call and the video sender limit configured in Jicofo.
     */
    VIDEO_UNMUTE_PERMISSIONS_CHANGED = 'conference.video_unmute_permissions_changed',

    /**
     * Event indicating we have received a message from the visitors component.
     */
    VISITORS_MESSAGE = 'conference.visitors_message',

    /**
     * Event indicating that our request for promotion was rejected.
     */
    VISITORS_REJECTION = 'conference.visitors_rejection',

    /**
     * Indicates that the conference has support for visitors.
     */
    VISITORS_SUPPORTED_CHANGED = 'conference.visitorsSupported',

    /**
     * An event(library-private) fired when the conference switches the currently active media session.
     * @type {string}
     * @private
     */
    _MEDIA_SESSION_ACTIVE_CHANGED = 'conference.media_session.active_changed',

    /**
     * An event(library-private) fired when a new media session is added to the conference.
     * @type {string}
     * @private
     */
    _MEDIA_SESSION_STARTED = 'conference.media_session.started'
}

// exported for backward compatibility
export const _MEDIA_SESSION_STARTED = JitsiConferenceEvents._MEDIA_SESSION_STARTED;
export const _MEDIA_SESSION_ACTIVE_CHANGED = JitsiConferenceEvents._MEDIA_SESSION_ACTIVE_CHANGED;
export const AUDIO_INPUT_STATE_CHANGE = JitsiConferenceEvents.AUDIO_INPUT_STATE_CHANGE;
export const AUDIO_UNMUTE_PERMISSIONS_CHANGED = JitsiConferenceEvents.AUDIO_UNMUTE_PERMISSIONS_CHANGED;
export const AUTH_STATUS_CHANGED = JitsiConferenceEvents.AUTH_STATUS_CHANGED;
export const AV_MODERATION_APPROVED = JitsiConferenceEvents.AV_MODERATION_APPROVED;
export const AV_MODERATION_CHANGED = JitsiConferenceEvents.AV_MODERATION_CHANGED;
export const AV_MODERATION_PARTICIPANT_APPROVED = JitsiConferenceEvents.AV_MODERATION_PARTICIPANT_APPROVED;
export const AV_MODERATION_PARTICIPANT_REJECTED = JitsiConferenceEvents.AV_MODERATION_PARTICIPANT_REJECTED;
export const AV_MODERATION_REJECTED = JitsiConferenceEvents.AV_MODERATION_REJECTED;
export const BEFORE_STATISTICS_DISPOSED = JitsiConferenceEvents.BEFORE_STATISTICS_DISPOSED;
export const BOT_TYPE_CHANGED = JitsiConferenceEvents.BOT_TYPE_CHANGED;
export const BREAKOUT_ROOMS_MOVE_TO_ROOM = JitsiConferenceEvents.BREAKOUT_ROOMS_MOVE_TO_ROOM;
export const BREAKOUT_ROOMS_UPDATED = JitsiConferenceEvents.BREAKOUT_ROOMS_UPDATED;
export const BRIDGE_BWE_STATS_RECEIVED = JitsiConferenceEvents.BRIDGE_BWE_STATS_RECEIVED;
export const CONFERENCE_CREATED_TIMESTAMP = JitsiConferenceEvents.CONFERENCE_CREATED_TIMESTAMP;
export const CONFERENCE_ERROR = JitsiConferenceEvents.CONFERENCE_ERROR;
export const CONFERENCE_FAILED = JitsiConferenceEvents.CONFERENCE_FAILED;
export const CONFERENCE_JOIN_IN_PROGRESS = JitsiConferenceEvents.CONFERENCE_JOIN_IN_PROGRESS;
export const CONFERENCE_JOINED = JitsiConferenceEvents.CONFERENCE_JOINED;
export const CONFERENCE_LEFT = JitsiConferenceEvents.CONFERENCE_LEFT;
export const CONFERENCE_UNIQUE_ID_SET = JitsiConferenceEvents.CONFERENCE_UNIQUE_ID_SET;
export const CONFERENCE_VISITOR_CODECS_CHANGED = JitsiConferenceEvents.CONFERENCE_VISITOR_CODECS_CHANGED;
export const CONNECTION_ESTABLISHED = JitsiConferenceEvents.CONNECTION_ESTABLISHED;
export const CONNECTION_INTERRUPTED = JitsiConferenceEvents.CONNECTION_INTERRUPTED;
export const CONNECTION_RESTORED = JitsiConferenceEvents.CONNECTION_RESTORED;
export const DATA_CHANNEL_CLOSED = JitsiConferenceEvents.DATA_CHANNEL_CLOSED;
export const DATA_CHANNEL_OPENED = JitsiConferenceEvents.DATA_CHANNEL_OPENED;
export const DISPLAY_NAME_CHANGED = JitsiConferenceEvents.DISPLAY_NAME_CHANGED;
export const DOMINANT_SPEAKER_CHANGED = JitsiConferenceEvents.DOMINANT_SPEAKER_CHANGED;
export const DTMF_SUPPORT_CHANGED = JitsiConferenceEvents.DTMF_SUPPORT_CHANGED;
export const E2EE_VERIFICATION_AVAILABLE = JitsiConferenceEvents.E2EE_VERIFICATION_AVAILABLE;
export const E2EE_VERIFICATION_COMPLETED = JitsiConferenceEvents.E2EE_VERIFICATION_COMPLETED;
export const E2EE_VERIFICATION_READY = JitsiConferenceEvents.E2EE_VERIFICATION_READY;
export const ENCODE_TIME_STATS_RECEIVED = JitsiConferenceEvents.ENCODE_TIME_STATS_RECEIVED;
export const ENDPOINT_MESSAGE_RECEIVED = JitsiConferenceEvents.ENDPOINT_MESSAGE_RECEIVED;
export const ENDPOINT_STATS_RECEIVED = JitsiConferenceEvents.ENDPOINT_STATS_RECEIVED;
export const FILE_SHARING_FILES_RECEIVED = JitsiConferenceEvents.FILE_SHARING_FILES_RECEIVED;
export const FILE_SHARING_FILE_ADDED = JitsiConferenceEvents.FILE_SHARING_FILE_ADDED;
export const FILE_SHARING_FILE_REMOVED = JitsiConferenceEvents.FILE_SHARING_FILE_REMOVED;
export const FORWARDED_SOURCES_CHANGED = JitsiConferenceEvents.FORWARDED_SOURCES_CHANGED;
export const JVB121_STATUS = JitsiConferenceEvents.JVB121_STATUS;
export const KICKED = JitsiConferenceEvents.KICKED;
export const LAST_N_ENDPOINTS_CHANGED = JitsiConferenceEvents.LAST_N_ENDPOINTS_CHANGED;
export const LOBBY_USER_JOINED = JitsiConferenceEvents.LOBBY_USER_JOINED;
export const LOBBY_USER_LEFT = JitsiConferenceEvents.LOBBY_USER_LEFT;
export const LOBBY_USER_UPDATED = JitsiConferenceEvents.LOBBY_USER_UPDATED;
export const LOCK_STATE_CHANGED = JitsiConferenceEvents.LOCK_STATE_CHANGED;
export const MEMBERS_ONLY_CHANGED = JitsiConferenceEvents.MEMBERS_ONLY_CHANGED;
export const MESSAGE_RECEIVED = JitsiConferenceEvents.MESSAGE_RECEIVED;
export const METADATA_UPDATED = JitsiConferenceEvents.METADATA_UPDATED;
export const NO_AUDIO_INPUT = JitsiConferenceEvents.NO_AUDIO_INPUT;
export const NOISY_MIC = JitsiConferenceEvents.NOISY_MIC;
export const NON_PARTICIPANT_MESSAGE_RECEIVED = JitsiConferenceEvents.NON_PARTICIPANT_MESSAGE_RECEIVED;
export const P2P_STATUS = JitsiConferenceEvents.P2P_STATUS;
export const PARTICIPANT_KICKED = JitsiConferenceEvents.PARTICIPANT_KICKED;
export const PARTICIPANT_SOURCE_UPDATED = JitsiConferenceEvents.PARTICIPANT_SOURCE_UPDATED;
export const PERMISSIONS_RECEIVED = JitsiConferenceEvents.PERMISSIONS_RECEIVED;
export const PRIVATE_MESSAGE_RECEIVED = JitsiConferenceEvents.PRIVATE_MESSAGE_RECEIVED;
export const PARTCIPANT_FEATURES_CHANGED = JitsiConferenceEvents.PARTCIPANT_FEATURES_CHANGED;
export const PARTICIPANT_PROPERTY_CHANGED = JitsiConferenceEvents.PARTICIPANT_PROPERTY_CHANGED;
export const PHONE_NUMBER_CHANGED = JitsiConferenceEvents.PHONE_NUMBER_CHANGED;
export const PROPERTIES_CHANGED = JitsiConferenceEvents.PROPERTIES_CHANGED;
export const REACTION_RECEIVED = JitsiConferenceEvents.REACTION_RECEIVED;
export const RECORDER_STATE_CHANGED = JitsiConferenceEvents.RECORDER_STATE_CHANGED;
export const SERVER_REGION_CHANGED = JitsiConferenceEvents.SERVER_REGION_CHANGED;
export const SILENT_STATUS_CHANGED = JitsiConferenceEvents.SILENT_STATUS_CHANGED;
export const START_MUTED_POLICY_CHANGED = JitsiConferenceEvents.START_MUTED_POLICY_CHANGED;
export const SUBJECT_CHANGED = JitsiConferenceEvents.SUBJECT_CHANGED;
export const SUSPEND_DETECTED = JitsiConferenceEvents.SUSPEND_DETECTED;
export const TALK_WHILE_MUTED = JitsiConferenceEvents.TALK_WHILE_MUTED;
export const TRACK_ADDED = JitsiConferenceEvents.TRACK_ADDED;
export const TRACK_AUDIO_LEVEL_CHANGED = JitsiConferenceEvents.TRACK_AUDIO_LEVEL_CHANGED;
export const TRACK_MUTE_CHANGED = JitsiConferenceEvents.TRACK_MUTE_CHANGED;
export const TRACK_REMOVED = JitsiConferenceEvents.TRACK_REMOVED;
export const TRACK_UNMUTE_REJECTED = JitsiConferenceEvents.TRACK_UNMUTE_REJECTED;
export const TRANSCRIPTION_STATUS_CHANGED = JitsiConferenceEvents.TRANSCRIPTION_STATUS_CHANGED;
export const USER_JOINED = JitsiConferenceEvents.USER_JOINED;
export const USER_LEFT = JitsiConferenceEvents.USER_LEFT;
export const USER_ROLE_CHANGED = JitsiConferenceEvents.USER_ROLE_CHANGED;
export const USER_STATUS_CHANGED = JitsiConferenceEvents.USER_STATUS_CHANGED;
export const VIDEO_CODEC_CHANGED = JitsiConferenceEvents.VIDEO_CODEC_CHANGED;
export const VIDEO_SIP_GW_AVAILABILITY_CHANGED = JitsiConferenceEvents.VIDEO_SIP_GW_AVAILABILITY_CHANGED;
export const VIDEO_SIP_GW_SESSION_STATE_CHANGED = JitsiConferenceEvents.VIDEO_SIP_GW_SESSION_STATE_CHANGED;
export const VIDEO_UNMUTE_PERMISSIONS_CHANGED = JitsiConferenceEvents.VIDEO_UNMUTE_PERMISSIONS_CHANGED;
export const VISITORS_SUPPORTED_CHANGED = JitsiConferenceEvents.VISITORS_SUPPORTED_CHANGED;
export const VISITORS_MESSAGE = JitsiConferenceEvents.VISITORS_MESSAGE;
export const VISITORS_REJECTION = JitsiConferenceEvents.VISITORS_REJECTION;
